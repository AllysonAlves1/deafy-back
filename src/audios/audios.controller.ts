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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AudioFileValidator } from './audio-file-validator';
import { Category } from '@prisma/client';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';
import { AzureStorageService } from '../azure/azure.service';

@ApiTags('Audios')
@ApiBearerAuth()
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

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateAudioWithUploadDto,
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('audio'))
  createPost(
    @Req() req,
    @Body() createAudioDto: CreateAudioDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new AudioFileValidator({
            maxSize: 1024 * 1024 * 100,
            mimeType: 'audio/mpeg',
          }),
        ],
        errorHttpStatusCode: 422,
      }),
    )
    file: Express.Multer.File,
  ) {
    const id = req.user.sub;
    return this.audiosService.createAudio(+id, { ...createAudioDto, file });
  }

  // @UseInterceptors(CacheInterceptor)
  // @Get(':category')
  // findAllCategory(
  //   // @Req() req,
  //   @Param('category') category: Category,
  // ) {
  //   // console.log(req.user.sub);
  //   console.log('chamou o cache');
  //   return this.audiosService.findAllCategory(category);
  // }

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    return this.audiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiosService.findOne(+id);
  }

  @Patch()
  update(@Param('id') id: string, @Body() updateAudioDto: UpdateAudioDto) {
    return this.audiosService.update(+id, updateAudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audiosService.remove(+id);
  }
}
