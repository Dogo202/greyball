import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FighterService } from './fighter.service';
import { Fighter } from './fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';

@Resolver(() => Fighter)
export class FighterResolver {
    constructor(private readonly service: FighterService) {}

    @Query(() => [Fighter])
    fighters() {
        return this.service.findAll();
    }

    @Query(() => Fighter, { nullable: true })
    fighter(@Args('id', { type: () => Int }) id: number) {
        return this.service.findOne(id);
    }

    @Mutation(() => Fighter)
    createFighter(@Args('input') input: CreateFighterInput) {
        return this.service.create(input);
    }

    @Mutation(() => Fighter)
    updateFighter(@Args('input') input: UpdateFighterInput) {
        const { id, ...rest } = input;
        return this.service.update(id, rest);
    }

    @Mutation(() => Int)
    removeFighter(@Args('id', { type: () => Int }) id: number) {
        return this.service.remove(id);
    }
}
