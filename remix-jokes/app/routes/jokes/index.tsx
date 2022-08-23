import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { graphqlClient } from "~/graphql.server";
import { type RandomJokeQuery } from "~/graphql/generated";

export const RANDOM_JOKE_QUERY = /* GraphQL */ `
  query RandomJoke {
    randomJoke {
      id
      name
      content
    }
  }
`;

type LoaderData = Pick<RandomJokeQuery, "randomJoke">;

export const loader: LoaderFunction = async () => {
  const { randomJoke } = await graphqlClient.RandomJoke();
  const data: LoaderData = { randomJoke };
  return json(data);
};

export default function JokesIndexRoute() {
  const { randomJoke } = useLoaderData<LoaderData>();
  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{randomJoke.content}</p>
      <Link to={randomJoke.id}>"{randomJoke.name}" Permalink</Link>
    </div>
  );
}
