import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@InputType('BookInputType')
@ObjectType()
@Entity('book')
export class Book extends CommonEntity {
  @Column()
  @Field(() => String)
  title: string; // 책 제목

  @Column()
  @Field(() => String)
  link: string; // 네이버 도서 정보 URL

  @Column()
  @Field(() => String)
  image: string; // 썸네일 이미지의 URL

  @Column()
  @Field(() => String)
  author: string; // 저자 이름

  @Column()
  @Field(() => String)
  discount: number; // 판매 가격. 절판 등의 이유로 가격이 없으면 값을 반환하지 않음

  @Column()
  @Field(() => String)
  publisher: string; // 출판사 이름

  @Column()
  @Field(() => String)
  isbn: number; // ISBN

  @Column()
  @Field(() => String)
  description: string; // 네이버 도서의 책 소개

  @Column()
  @Field(() => String)
  pubdate: Date; // 출간일
}
