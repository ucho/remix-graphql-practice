import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Joke {
  @Field(() => ID)
  id: string;

  name: string;

  content: string;
}
