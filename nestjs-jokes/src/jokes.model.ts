import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Joke {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  content: string;
}

@InputType()
export class JokeInput {
  @Field()
  name: string;

  @Field()
  content: string;
}
