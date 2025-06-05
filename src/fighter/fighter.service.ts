import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from './fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';

@Injectable()
export class FighterService {
    constructor(
        @InjectRepository(Fighter)
        private repo: Repository<Fighter>,
    ) {}

    create(data: CreateFighterInput) {
        return this.repo.save(data);
    }

    findAll() {
        return this.repo.find({
            relations: ['fightsAsRed', 'fightsAsBlue', 'events'],
        });
    }

    findOne(id: number) {
        return this.repo.findOne({
            where: { id },
            relations: ['fightsAsRed', 'fightsAsBlue', 'events'],
        });
    }

    async update(id: number, data: Partial<Fighter>) {
        await this.repo.update(id, data);
        return this.repo.findOneBy({ id });
    }

    async remove(id: number) {
        await this.repo.delete(id);
        return id;
    }
}
