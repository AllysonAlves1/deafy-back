import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreateAudioDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  subtitle: string;
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  authorId: number;
}

export class CreateAudioWithUploadDto extends CreateAudioDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: string;
}
