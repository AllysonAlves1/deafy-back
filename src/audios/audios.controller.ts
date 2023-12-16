import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AudiosService } from './audios.service';
import {
  CreateAudioDto,
  CreateAudioWithUploadDto,
} from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AudioFileValidator } from './audio-file-validator';
import { Category } from '@prisma/client';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';
import { AzureStorageService } from '../azure/azure.service';

@ApiTags('Audios')
@ApiBearerAuth()
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 404, description: 'Forbidden' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@UseGuards(AuthGuard)
@Controller('audios')
export class AudiosController {
  constructor(
    private readonly audiosService: AudiosService,
    private readonly azureStorageService: AzureStorageService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateAudioWithUploadDto,
  })
  @ApiOperation({ summary: 'Requisição com áudio e imagem' })
  @Post('posts/upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  async createAudio(
    @Req() req,
    @Body() createAudioDto: CreateAudioDto,
    @UploadedFiles()
    files: { audio: Express.Multer.File; image: Express.Multer.File },
  ) {
    const id = req.user.sub;
    const audio = await this.azureStorageService.uploadToAzureBlob(
      files.audio[0],
      'musicas',
    );

    const image = await this.azureStorageService.uploadToAzureBlob(
      files.image[0],
      'imagens',
    );

    return this.audiosService.createPost(+id, {
      ...createAudioDto,
      audioUrl: audio.blobUrl,
      imageUrl: image.blobUrl,
    });
  }

  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateAudioWithUploadDto,
  })
  @ApiOperation({ summary: 'Requisição só para áudio' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('audio'))
  async createPost(
    @Req() req,
    @Body() createAudioDto: CreateAudioDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new AudioFileValidator({
            maxSize: 1024 * 1024 * 100,
            mimeType: 'audio/wav',
          }),
        ],
        errorHttpStatusCode: 422,
      }),
    )
    file: Express.Multer.File,
  ) {
    const id = req.user.sub;
    const audio = await this.azureStorageService.uploadToAzureBlob(
      file,
      'musicas',
    );
    return this.audiosService.createAudio(+id, {
      ...createAudioDto,
      audioUrl: audio.blobUrl,
    });
  }

  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Buscar todos os áudios de uma categoria' })
  @Get('category/:category')
  findAllCategory(@Param('category') category: Category) {
    return this.audiosService.findAllCategory(category);
  }

  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Buscar todas as categorias, exceto a de AUDIO' })
  @Get()
  findAll() {
    return this.audiosService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um áudio' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiosService.findOne(+id);
  }
  @ApiBody({
    type: CreateAudioDto,
  })
  @ApiOperation({ summary: 'Atualizar um áudio' })
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateAudioDto: UpdateAudioDto,
  ) {
    const idUser = req.user.sub;
    return this.audiosService.update(+id, idUser, updateAudioDto);
  }

  @ApiOperation({ summary: 'Deletar um áudio' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audiosService.remove(+id);
  }
}
