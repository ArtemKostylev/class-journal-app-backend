interface Resolver {
    resolvers: {
        Query: any
        Mutation: any
    }
}

export function mergeResolvers(resolvers: Resolver[]) {
    return resolvers.reduce(
        (acc, resolver) => {
            return {
                Query: {
                    ...acc.Query,
                    ...resolver.resolvers.Query,
                },
                Mutation: {
                    ...acc.Mutation,
                    ...resolver.resolvers.Mutation,
                },
            }
        },
        {
            Query: {},
            Mutation: {},
        }
    )
}
