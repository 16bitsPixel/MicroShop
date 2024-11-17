import { Field, ObjectType, InputType } from "type-graphql"
// import { Matches } from "class-validator";

@ObjectType('userdetails')
export class UserDetails {
  @Field()
    email!: string
  @Field()
    firstName!: string
  @Field()
    lastName!: string
}

@ObjectType('order')
export class Order {
  @Field()
    id!: string
  @Field()
    orderNumber!: string
  @Field()
    skuCode!: string
  @Field()
    price!: number
  @Field()
    quantity!: number
  @Field()
    userDetails!: UserDetails
}

@InputType('OrderRequest')
export class OrderRequest {
  @Field()
    skuCode!: string
  @Field()
    quantity!: number
  @Field()
    price!: number
  /*
  @Field()
    userDetails!: UserDetails
  */
}
