import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.entity';
import {CreateRankingInput} from "./dto/create-ranking.input";
import {UpdateRankingInput} from "./dto/update-ranking.input";

@Resolver(() => Ranking)
export class RankingResolver {
    constructor(private readonly rankingService: RankingService) {}

    @Query(() => [Ranking])
    rankings() {
        return this.rankingService.findAll();
    }

    @Query(() => Ranking)
    ranking(@Args('id', { type: () => Int }) id: number) {
        return this.rankingService.findOne(id);
    }

    @Mutation(() => Ranking)
    createRanking(@Args('input') input: CreateRankingInput) {
        return this.rankingService.create(input);
    }

    @Mutation(() => Ranking)
    updateRanking(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateRankingInput) {
        return this.rankingService.update(id, input);
    }

    @Mutation(() => Int)
    removeRanking(@Args('id', { type: () => Int }) id: number) {
        return this.rankingService.remove(id);
    }
}
