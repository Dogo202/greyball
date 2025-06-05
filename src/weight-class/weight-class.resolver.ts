import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WeightClassService } from './weight-class.service';
import { WeightClass } from './weight-class.entity';
import { CreateWeightClassInput } from './dto/create-weight-class.input';
import { UpdateWeightClassInput } from './dto/update-weight-class.input';

@Resolver(() => WeightClass)
export class WeightClassResolver {
    constructor(private readonly service: WeightClassService) {}

    @Query(() => [WeightClass])
    weightClasses() {
        return this.service.findAll();
    }

    @Query(() => WeightClass, { nullable: true })
    weightClass(@Args('id', { type: () => Int }) id: number) {
        return this.service.findOne(id);
    }

    @Mutation(() => WeightClass)
    createWeightClass(@Args('input') input: CreateWeightClassInput) {
        return this.service.create(input);
    }

    @Mutation(() => WeightClass)
    updateWeightClass(@Args('input') input: UpdateWeightClassInput) {
        const { id, ...rest } = input;
        return this.service.update(id, rest);
    }

    @Mutation(() => Int)
    removeWeightClass(@Args('id', { type: () => Int }) id: number) {
        return this.service.remove(id);
    }
}