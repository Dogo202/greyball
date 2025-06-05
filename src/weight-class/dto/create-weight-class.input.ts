import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateWeightClassInput {
    @Field()
    name: string;

    @Field(() => Float, { nullable: true })
    min_weight?: number;

    @Field(() => Float, { nullable: true })
    max_weight?: number;
}
