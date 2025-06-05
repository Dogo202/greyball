import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fighter } from '../fighter/fighter.entity';
import { WeightClass } from '../weight-class/weight-class.entity';

@ObjectType()
@Entity()
export class Ranking {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Fighter)
    @ManyToOne(() => Fighter, { eager: true })
    fighter: Fighter;

    @Field(() => WeightClass)
    @ManyToOne(() => WeightClass, { eager: true })
    weightClass: WeightClass;

    @Field(() => Int)
    @Column({ default: 0 })
    points: number;

    @Field(() => Int)
    @Column({ default: 0 })
    position: number;
}
