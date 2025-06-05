import { InputType, Field, Int, Float, PartialType } from '@nestjs/graphql';
import { CreateFighterInput } from './create-fighter.input';

@InputType()
export class UpdateFighterInput extends PartialType(CreateFighterInput) {
    @Field(() => Int)
    id: number;
}
