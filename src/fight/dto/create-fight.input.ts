import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFightInput {
    @Field(() => Int)
    eventId: number;

    @Field(() => Int)
    fighterRedId: number;

    @Field(() => Int)
    fighterBlueId: number;

    @Field(() => Int, { nullable: true })
    winnerId?: number;

    @Field({ nullable: true })
    method?: string;

    @Field({ nullable: true })
    round?: string;

    @Field({ nullable: true })
    time?: string;
}
