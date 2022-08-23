import { type ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { graphqlClient } from "~/graphql.server";

export const ADD_JOKE_MUTATION = /* GraphQL */ `
  mutation AddJoke($input: JokeInput!) {
    addJoke(input: $input) {
      id
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof name !== "string" || typeof content !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const input = { name, content };

  const { addJoke } = await graphqlClient.AddJoke({ input });
  return redirect(`/jokes/${addJoke.id}`);
};

export default function NewJokeRoute() {
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Name: <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
