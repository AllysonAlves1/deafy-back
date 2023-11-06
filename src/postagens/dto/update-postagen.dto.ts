import { PartialType } from '@nestjs/mapped-types';
import { CreatePostagenDto } from './create-postagen.dto';

export class UpdatePostagenDto extends PartialType(CreatePostagenDto) {}
