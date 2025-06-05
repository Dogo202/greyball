import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';
import { Fighter } from '../fighter/fighter.entity';
import { WeightClass } from '../weight-class/weight-class.entity';
import { Fight } from '../fight/fight.entity';

@Injectable()
export class RankingService {
    constructor(
        @InjectRepository(Ranking)
        private rankingRepo: Repository<Ranking>,
        @InjectRepository(Fighter)
        private fighterRepo: Repository<Fighter>,
        @InjectRepository(WeightClass)
        private weightClassRepo: Repository<WeightClass>,
    ) {}

    async findAll() {
        return this.rankingRepo.find({ relations: ['fighter', 'weightClass'] });
    }

    async findOne(id: number) {
        return this.rankingRepo.findOne({ where: { id }, relations: ['fighter', 'weightClass'] });
    }

    async create(input: CreateRankingInput) {
        const fighter = await this.fighterRepo.findOneBy({ id: input.fighterId });
        const weightClass = await this.weightClassRepo.findOneBy({ id: input.weightClassId });
        if (!fighter || !weightClass) throw new Error('Fighter or WeightClass not found');

        const ranking = this.rankingRepo.create({
            fighter,
            weightClass,
            points: input.points ?? 0,
            position: input.position ?? 0,
        });
        return this.rankingRepo.save(ranking);
    }

    async update(id: number, input: UpdateRankingInput) {
        const ranking = await this.rankingRepo.findOne({ where: { id }, relations: ['fighter', 'weightClass'] });
        if (!ranking) throw new Error('Ranking not found');

        if (input.fighterId) {
            const fighter = await this.fighterRepo.findOneBy({ id: input.fighterId });
            if (fighter) ranking.fighter = fighter;
        }
        if (input.weightClassId) {
            const weightClass = await this.weightClassRepo.findOneBy({ id: input.weightClassId });
            if (weightClass) ranking.weightClass = weightClass;
        }
        if (typeof input.points === 'number') ranking.points = input.points;
        if (typeof input.position === 'number') ranking.position = input.position;

        return this.rankingRepo.save(ranking);
    }

    async remove(id: number) {
        await this.rankingRepo.delete(id);
        return id;
    }

    // Логика для пересчёта рейтинга после боя
    async updateRankingsAfterFight(fight: Fight) {
        const fighters = [fight.fighterRed, fight.fighterBlue];
        const weightClass = fight.weightClass;
        if (!weightClass) return;

        for (const fighter of fighters) {
            let ranking = await this.rankingRepo.findOne({
                where: { fighter: { id: fighter.id }, weightClass: { id: weightClass.id } },
                relations: ['fighter', 'weightClass'],
            });
            if (!ranking) {
                ranking = this.rankingRepo.create({
                    fighter,
                    weightClass: weightClass,
                    points: 0,
                    position: 0,
                });
            }
            if (fight.winner?.id === fighter.id) {
                ranking.points += 3;
            } else if (!fight.winner) {
                ranking.points += 1;
            }
            await this.rankingRepo.save(ranking);
        }

        // Пересчёт позиций
        const rankings = await this.rankingRepo.find({
            where: { weightClass: { id: weightClass.id } },
            order: { points: 'DESC' },
            relations: ['fighter', 'weightClass'],
        });
        let position = 1;
        for (const r of rankings) {
            r.position = position++;
        }
        await this.rankingRepo.save(rankings);
    }
}
