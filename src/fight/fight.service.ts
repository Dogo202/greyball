import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Fight } from './fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';
import { Fighter } from '../fighter/fighter.entity';
import { Event } from '../event/event.entity';
import { RankingService } from '../ranking/ranking.service';

@Injectable()
export class FightService {
    constructor(
        @InjectRepository(Fight)
        private repo: Repository<Fight>,
        @InjectRepository(Fighter)
        private fighterRepo: Repository<Fighter>,
        @InjectRepository(Event)
        private eventRepo: Repository<Event>,
        private readonly rankingService: RankingService,
    ) {}

    async findAll() {
        return this.repo.find({
            relations: ['event', 'fighterRed', 'fighterBlue', 'winner'],
        });
    }

    async findOne(id: number) {
        return this.repo.findOne({
            where: { id },
            relations: ['event', 'fighterRed', 'fighterBlue', 'winner'],
        });
    }

    async create(input: CreateFightInput) {
        const event = await this.eventRepo.findOneBy({ id: input.eventId });
        const fighterRed = await this.fighterRepo.findOneBy({ id: input.fighterRedId });
        const fighterBlue = await this.fighterRepo.findOneBy({ id: input.fighterBlueId });
        const winner = input.winnerId ? await this.fighterRepo.findOneBy({ id: input.winnerId }) : null;

        if (!event) throw new Error('Event not found');
        if (!fighterRed) throw new Error('fighterRed not found');
        if (!fighterBlue) throw new Error('fighterBlue not found');

        const fight = this.repo.create({
            method: input.method,
            round: input.round,
            time: input.time,
        });

        fight.event = event;
        fight.fighterRed = fighterRed;
        fight.fighterBlue = fighterBlue;
        fight.winner = winner ?? null;

        await this.repo.save(fight);

        // если есть результат — обновляем статистику и рейтинг
        if (winner !== undefined) {
            const loadedFight = await this.repo.findOne({
                where: { id: fight.id },
                relations: ['fighterRed', 'fighterBlue', 'winner'],
            });
            if (loadedFight) {
                await this.applyFightResult(loadedFight, loadedFight.winner ?? null);
            }
        }

        return fight;
    }

    async update(id: number, input: UpdateFightInput) {
        const fight = await this.repo.findOne({
            where: { id },
            relations: ['event', 'fighterRed', 'fighterBlue', 'winner'],
        });
        if (!fight) throw new Error('Fight not found');

        if (input.eventId) {
            const event = await this.eventRepo.findOneBy({ id: input.eventId });
            if (event) fight.event = event;
        }
        if (input.fighterRedId) {
            const fighterRed = await this.fighterRepo.findOneBy({ id: input.fighterRedId });
            if (fighterRed) fight.fighterRed = fighterRed;
        }
        if (input.fighterBlueId) {
            const fighterBlue = await this.fighterRepo.findOneBy({ id: input.fighterBlueId });
            if (fighterBlue) fight.fighterBlue = fighterBlue;
        }
        // Победитель может быть null (ничья)
        if (input.winnerId !== undefined) {
            fight.winner = input.winnerId ? await this.fighterRepo.findOneBy({ id: input.winnerId }) : null;
        }
        if (input.method !== undefined) fight.method = input.method;
        if (input.round !== undefined) fight.round = input.round;
        if (input.time !== undefined) fight.time = input.time;

        await this.repo.save(fight);

        // Подгружаем связи для корректной работы applyFightResult
        const loadedFight = await this.repo.findOne({
            where: { id: fight.id },
            relations: ['fighterRed', 'fighterBlue', 'winner'],
        });

        if (input.winnerId !== undefined && loadedFight) {
            await this.applyFightResult(loadedFight, loadedFight.winner ?? null);
        }

        return loadedFight;
    }

    async applyFightResult(fight: Fight, winner: Fighter | null) {
        // Сбросить статы (упрощённо, для тестов)
        [fight.fighterRed, fight.fighterBlue].forEach(f => {
            f.wins = f.wins || 0;
            f.losses = f.losses || 0;
            f.draws = f.draws || 0;
        });

        if (!winner) {
            fight.fighterRed.draws++;
            fight.fighterBlue.draws++;
        } else if (winner.id === fight.fighterRed.id) {
            fight.fighterRed.wins++;
            fight.fighterBlue.losses++;
        } else if (winner.id === fight.fighterBlue.id) {
            fight.fighterBlue.wins++;
            fight.fighterRed.losses++;
        }

        await this.fighterRepo.save([fight.fighterRed, fight.fighterBlue]);

        // Асинхронно пересчитать рейтинг
        this.rankingService.updateRankingsAfterFight(fight).catch(() => {});
    }

    async remove(id: number) {
        await this.repo.delete(id);
        return id;
    }
}
