import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateEventInput } from './create-event.input';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
    @Field(() => Int)
    id: number;

    @Field(() => [Int], { nullable: true })
    participantIds?: number[];
}