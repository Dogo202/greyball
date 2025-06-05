import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateRankingInput } from './create-ranking.input';

@InputType()
export class UpdateRankingInput extends PartialType(CreateRankingInput) {
    @Field(() => Int)
    id: number;

    @Field(() => Int, { nullable: true })
    fighterId?: number;

    @Field(() => Int, { nullable: true })
    weightClassId?: number;
}
