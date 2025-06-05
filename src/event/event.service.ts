import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Event } from './event.entity';
import { Fighter } from '../fighter/fighter.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event) private repo: Repository<Event>,
        @InjectRepository(Fighter) private fighterRepo: Repository<Fighter>,
    ) {}

    async create(data: CreateEventInput) {
        // Создаём event без участников (только основные поля)
        const event = this.repo.create({
            name: data.name,
            location: data.location,
            date: data.date,
        });
        const savedEvent = await this.repo.save(event); // теперь event.id есть

        // Теперь находим бойцов-участников
        const participants = data.participantIds?.length
            ? await this.fighterRepo.find({ where: { id: In(data.participantIds) } })
            : [];
        console.log('Создаём event, participants:', participants.map(p => p.id));
        console.log('Указанные participantIds:', data.participantIds);
        console.log('Реально найдено бойцов:', participants.map(p => p.id));
        if (participants.length !== data.participantIds.length) {
            throw new Error('Не все бойцы найдены! Проверь participantIds');
        }

        // Добавляем участников и сохраняем снова
        savedEvent.participants = participants;
        await this.repo.save(savedEvent);

        // Возвращаем уже с подгруженными связями (если надо)
        return this.repo.findOne({ where: { id: savedEvent.id }, relations: ['fights', 'participants'] });
    }

    findAll() {
        return this.repo.find({ relations: ['fights', 'participants'] });
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id }, relations: ['fights', 'participants'] });
    }

    async update(data: UpdateEventInput) {
        const event = await this.repo.findOne({ where: { id: data.id }, relations: ['participants'] });
        if (!event) throw new Error('Event not found');
        if (data.participantIds) {
            event.participants = await this.fighterRepo.find({ where: { id: In(data.participantIds) } });
        }
        if (data.name !== undefined) event.name = data.name;
        if (data.location !== undefined) event.location = data.location;
        if (data.date !== undefined) event.date = data.date;
        return this.repo.save(event);
    }

    async remove(id: number) {
        await this.repo.delete(id);
        return id;
    }
}
