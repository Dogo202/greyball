import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightService } from './fight.service';
import { Fight } from './fight.entity';
import { CreateFightInput } from "./dto/create-fight.input";
import { UpdateFightInput } from "./dto/update-fight.input";

@Resolver(() => Fight)
export class FightResolver {
    constructor(private readonly fightService: FightService) {}

    @Query(() => [Fight])
    fights() {
        return this.fightService.findAll();
    }

    @Query(() => Fight)
    fight(@Args('id', { type: () => Int }) id: number) {
        return this.fightService.findOne(id);
    }

    @Mutation(() => Fight)
    createFight(@Args('input') input: CreateFightInput) {
        return this.fightService.create(input);
    }

    @Mutation(() => Fight)
    updateFight(@Args('input') input: UpdateFightInput) {
        // id уже внутри input
        return this.fightService.update(input.id, input);
    }

    @Mutation(() => Int)
    removeFight(@Args('id', { type: () => Int }) id: number) {
        return this.fightService.remove(id);
    }
}
