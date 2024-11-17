import { createYoga } from 'graphql-yoga'
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from "type-graphql"

import {ProductResolver} from '../../graphql/product/resolver';
import { OrderResolver } from '../../graphql/order/resolver';

const schema = buildSchemaSync({
  resolvers: [ProductResolver, OrderResolver],
  validate: true,
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})