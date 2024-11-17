import { Query, Resolver, Arg, Mutation, Ctx} from "type-graphql"

import { Order, UserDetails, OrderRequest } from "./schema"
import { OrderService } from "./service"

import { NextApiRequest } from "next"

@Resolver()
export class OrderResolver {
  @Mutation(() => Order, {nullable: true})
  async createOrder(
    @Arg("orderRequest") orderRequest: OrderRequest,
    @Arg("token", {nullable: true}) token: string,
  ): Promise<Order | undefined> {
    return new OrderService().orderProduct(orderRequest, token);
  }
}
