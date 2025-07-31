import {GraphQLResolveInfo} from "graphql";
import {PrismaClient} from '@prisma/client';

type Context = {
    userId: (req: any) => void;
    prisma: PrismaClient;
}

export type Resolver<T> = (_: undefined, args: T, context: Context, info: GraphQLResolveInfo) => any;