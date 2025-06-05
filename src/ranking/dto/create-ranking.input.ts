import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRankingInput {
    @Field(() => Int)
    fighterId: number;

    @Field(() => Int)
    weightClassId: number;

    @Field(() => Int, { defaultValue: 0 })
    points?: number;

    @Field(() => Int, { defaultValue: 0 })
    position?: number;
}
