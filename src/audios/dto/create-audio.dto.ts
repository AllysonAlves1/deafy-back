import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CreateAudioDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false })
  subtitle: string;
  @ApiProperty({ required: false, enum: ['MUSIC', 'PODCAST', 'AUDIOBOOK'] })
  category: Category;
  // @IsInt()
  // @Type(() => Number)
  // @ApiProperty()
  // authorId: number;
}

export class CreateAudioWithUploadDto extends CreateAudioDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  audio: string;

  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  image: string;
}
