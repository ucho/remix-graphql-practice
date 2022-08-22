import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { graphqlClient } from "~/graphql.server";
import { type JokeQuery } from "~/graphql/generated";

const JOKE_QUERY = /* GraphQL */ `
  query Joke($id: String!) {
    joke(id: $id) {
      id
      name
      content
    }
  }
`;

type NonNullableAll<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type LoaderData = NonNullableAll<Required<Pick<JokeQuery, "joke">>>;

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.jokeId) throw new Error("id is not specified.");
  const { joke } = await graphqlClient.Joke({ id: params.jokeId });
  if (!joke) throw new Error("Joke not found.");
  const data: LoaderData = { joke };
  return json(data);
};

export default function JokeRoute() {
  const { joke } = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.content}</p>
      <Link to=".">{joke.name} Permalink</Link>
    </div>
  );
}

export function ErrorBoundary() {
  const { jokeId } = useParams();
  return (
    <div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
  );
}
