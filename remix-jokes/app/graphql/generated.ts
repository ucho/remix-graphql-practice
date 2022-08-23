import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Joke = {
  __typename?: 'Joke';
  content: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type JokeInput = {
  content: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addJoke: Joke;
};


export type MutationAddJokeArgs = {
  input: JokeInput;
};

export type Query = {
  __typename?: 'Query';
  joke?: Maybe<Joke>;
  jokes: Array<Joke>;
  randomJoke: Joke;
};


export type QueryJokeArgs = {
  id: Scalars['String'];
};

export type JokesQueryVariables = Exact<{ [key: string]: never; }>;


export type JokesQuery = { __typename?: 'Query', jokes: Array<{ __typename?: 'Joke', id: string, name: string }> };

export type JokeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type JokeQuery = { __typename?: 'Query', joke?: { __typename?: 'Joke', id: string, name: string, content: string } | null };

export type RandomJokeQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomJokeQuery = { __typename?: 'Query', randomJoke: { __typename?: 'Joke', id: string, name: string, content: string } };

export type AddJokeMutationVariables = Exact<{
  input: JokeInput;
}>;


export type AddJokeMutation = { __typename?: 'Mutation', addJoke: { __typename?: 'Joke', id: string } };


export const JokesDocument = gql`
    query Jokes {
  jokes {
    id
    name
  }
}
    `;
export const JokeDocument = gql`
    query Joke($id: String!) {
  joke(id: $id) {
    id
    name
    content
  }
}
    `;
export const RandomJokeDocument = gql`
    query RandomJoke {
  randomJoke {
    id
    name
    content
  }
}
    `;
export const AddJokeDocument = gql`
    mutation AddJoke($input: JokeInput!) {
  addJoke(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Jokes(variables?: JokesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<JokesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<JokesQuery>(JokesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Jokes', 'query');
    },
    Joke(variables: JokeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<JokeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<JokeQuery>(JokeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Joke', 'query');
    },
    RandomJoke(variables?: RandomJokeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RandomJokeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RandomJokeQuery>(RandomJokeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RandomJoke', 'query');
    },
    AddJoke(variables: AddJokeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddJokeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddJokeMutation>(AddJokeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddJoke', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;