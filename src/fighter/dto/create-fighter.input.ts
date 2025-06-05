import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateFighterInput {
    @Field() firstName: string;
    @Field() lastName: string;
    @Field({ nullable: true }) nickname?: string;
    @Field({ nullable: true }) country?: string;
    @Field({ nullable: true }) dateOfBirth?: string;
    @Field(() => Float, { nullable: true }) height?: number;
    @Field(() => Float, { nullable: true }) weight?: number;
    @Field(() => Float, { nullable: true }) reach?: number;
}
