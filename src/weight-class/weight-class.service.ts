import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightClass } from './weight-class.entity';

@Injectable()
export class WeightClassService {
    constructor(
        @InjectRepository(WeightClass)
        private repo: Repository<WeightClass>,
    ) {}

    create(data: Partial<WeightClass>) {
        return this.repo.save(data);
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    async update(id: number, data: Partial<WeightClass>) {
        await this.repo.update(id, data);
        return this.repo.findOneBy({ id });
    }

    async remove(id: number) {
        await this.repo.delete(id);
        return id;
    }
}