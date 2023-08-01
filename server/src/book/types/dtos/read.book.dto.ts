import { PartialType, PickType } from '@nestjs/graphql';
import { Book } from '../entities/book.entity';

export class ReadBookInputDto extends PartialType(
  PickType(Book, ['title', 'id']),
) {}
