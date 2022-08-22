import { json, type LinksFunction, type LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { type JokesQuery } from "~/graphql/generated";
import stylesUrl from "~/styles/jokes.css";
import { graphqlClient } from "~/graphql.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

const JOKES_QUERY = /* GraphQL */ `
  query Jokes {
    jokes {
      id
      name
    }
  }
`;

type LoaderData = Pick<JokesQuery, "jokes">;

export const loader: LoaderFunction = async () => {
  const { jokes } = await graphqlClient.Jokes();
  const data: LoaderData = { jokes };
  return json(data);
};

export default function JokesRoute() {
  const { jokes } = useLoaderData<LoaderData>();
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {jokes.map((joke) => (
                <li key={joke.id}>
                  <Link to={joke.id}>{joke.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
