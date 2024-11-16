import { Field, ObjectType, InputType } from "type-graphql"
// import { Matches } from "class-validator";

@ObjectType('product')
export class Product {
  @Field()
    id!: string
  @Field()
    name!: string
  @Field()
    description!: string
  @Field()
    price!: number
  @Field({nullable: true})
    image?: string
}

@InputType('ProductRequest')
export class ProductRequest {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field({ nullable: true })
  image?: string;
}