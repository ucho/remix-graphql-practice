import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Joke, JokeInput } from './jokes.model';

const jokes: Joke[] = [
  {
    id: '1',
    name: 'Road worker',
    content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
  },
  {
    id: '2',
    name: 'Frisbee',
    content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
  },
  {
    id: '3',
    name: 'Trees',
    content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
  },
  {
    id: '4',
    name: 'Skeletons',
    content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
  },
  {
    id: '5',
    name: 'Hippos',
    content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
  },
  {
    id: '6',
    name: 'Dinner',
    content: `What did one plate say to the other plate? Dinner is on me!`,
  },
  {
    id: '7',
    name: 'Elevator',
    content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
  },
];

@Resolver(() => Joke)
export class JokesResolver {
  @Query(() => [Joke])
  jokes(): Joke[] {
    return jokes;
  }

  @Query(() => Joke, { nullable: true })
  joke(@Args('id') id: string): Joke | undefined {
    return jokes.find((joke) => joke.id === id);
  }

  @Query(() => Joke)
  randomJoke(): Joke {
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  @Mutation(() => Joke)
  addJoke(@Args('input') input: JokeInput): Joke {
    const newJoke: Joke = {
      id: String(jokes.length + 1),
      name: input.name,
      content: input.content,
    };
    jokes.push(newJoke);
    return newJoke;
  }
}
