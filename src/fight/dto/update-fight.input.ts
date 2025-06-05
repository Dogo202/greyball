import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateFightInput } from './create-fight.input';

@InputType()
export class UpdateFightInput extends PartialType(CreateFightInput) {
    @Field(() => Int)
    id: number;
}
