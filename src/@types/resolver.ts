import {GraphQLResolveInfo} from "graphql";
import {Context} from '../index';

export type Resolver<T> = (_: undefined, args: T, context: Context, info: GraphQLResolveInfo) => any;