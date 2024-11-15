/*
#######################################################################
#
# Copyright (C) 2022-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without 
# the express written permission of the copyright holder.
#
#######################################################################
*/

import { Query, Resolver, Arg} from "type-graphql"

import { Product } from "./schema"
import { ProductService } from "./service"

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

}
