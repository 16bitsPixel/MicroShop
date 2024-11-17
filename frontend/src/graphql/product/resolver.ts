import { Query, Resolver, Arg, Mutation, Ctx} from "type-graphql"

import { Product, ProductRequest } from "./schema"
import { ProductService } from "./service"

import { NextApiRequest } from "next"

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async product(): Promise<Product[]> {
    return new ProductService().getAll()
  }

  @Query(() => Product, { nullable: true })
  async productInfo(
    @Arg("productId") productId: string,
    // @Ctx() request: NextApiRequest
  ): Promise<Product | undefined> {
    return new ProductService().get(productId);
  }

  @Mutation(() => Product, { nullable: true })
  async createProduct(
    @Arg("productRequest") productRequest: ProductRequest,
    @Arg("token", {nullable: true}) token: string,
  ): Promise<Product | undefined> {
    return new ProductService().create(productRequest, token);
  }

  @Query(() => Number)
  async quantity(
    @Arg("productId") productId: string,
    // @Ctx() request: NextApiRequest
  ): Promise<number> {
    return new ProductService().getQuantity(productId);
  }

}
