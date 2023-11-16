import { ApiProperty } from '@nestjs/swagger';

export class CreateAudioDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  subtitle: string;
  @ApiProperty()
  authorId: number;
}

export class CreateAudioWithUploadDto extends CreateAudioDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  audio: string;
}
