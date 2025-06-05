import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { Fighter } from '../fighter/fighter.entity';
import { Fight } from '../fight/fight.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Event, Fighter, Fight])],
    providers: [EventService, EventResolver],
    exports: [TypeOrmModule],
})
export class EventModule {}
