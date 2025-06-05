import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './fighter.entity';
import { FighterService } from './fighter.service';
import { FighterResolver } from './fighter.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Fighter])],
    providers: [FighterService, FighterResolver],
})
export class FighterModule {}
