import { PickType } from '@nestjs/graphql';
import { Book } from '../entities/book.entity';

export class ReadBookInputDto extends PickType(Book, ['title']) {}
