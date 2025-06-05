import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
    @Field()
    name: string;

    @Field()
    location: string;

    @Field()
    date: string;

    @Field(() => [Int])
    participantIds: number[];
}