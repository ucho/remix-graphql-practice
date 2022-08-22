import { GraphQLClient } from "graphql-request";
import { getSdk } from "~/graphql/generated";

const graphqlClient = getSdk(
  new GraphQLClient(process.env.GRAPHQL_ENDPOINT ?? "")
);

export { graphqlClient };
