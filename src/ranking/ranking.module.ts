import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './ranking.entity';
import { RankingService } from './ranking.service';
import { RankingResolver } from './ranking.resolver';
import { Fighter } from '../fighter/fighter.entity';
import { WeightClass } from '../weight-class/weight-class.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Ranking, Fighter, WeightClass])],
    providers: [RankingService, RankingResolver],
    exports: [TypeOrmModule,RankingService],
})
export class RankingModule {}
