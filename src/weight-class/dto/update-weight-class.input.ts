import { InputType, Field, Int, Float, PartialType } from '@nestjs/graphql';
import { CreateWeightClassInput } from './create-weight-class.input';

@InputType()
export class UpdateWeightClassInput extends PartialType(CreateWeightClassInput) {
    @Field(() => Int)
    id: number;
}
