import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { WeightClassModule } from './weight-class/weight-class.module';
import { FighterModule } from './fighter/fighter.module';
import { EventModule } from './event/event.module';
import { FightModule } from './fight/fight.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Подключаем TypeORM только один раз
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: parseInt(config.get<string>('DATABASE_PORT', '5432'), 10),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,      // Автоматически подключать все entities из feature-модулей
        synchronize: true,           // Только для dev!
      }),
      inject: [ConfigService],
    }),

    // Feature-модули:
    WeightClassModule,
    FighterModule,
    EventModule,
    FightModule,
    RankingModule,

    // GraphQL:
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Автоматическая генерация схемы
      playground: true,     // Включить playground (UI для GraphQL)
    }),
  ],
})
export class AppModule {}
