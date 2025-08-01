import {GraphQLResolveInfo} from "graphql";

type Context = {
    userId: (req: any) => void;
}

export type Resolver<T> = (_: undefined, args: T, context: Context, info: GraphQLResolveInfo) => any;