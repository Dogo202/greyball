import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Fighter } from '../fighter/fighter.entity';
import { Event } from '../event/event.entity';
import {WeightClass} from "../weight-class/weight-class.entity";

@ObjectType()
@Entity()
export class Fight {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Event)
    @ManyToOne(() => Event, event => event.fights)
    event: Event;

    @Field(() => Fighter)
    @ManyToOne(() => Fighter, fighter => fighter.fightsAsRed)
    fighterRed: Fighter;

    @Field(() => Fighter)
    @ManyToOne(() => Fighter, fighter => fighter.fightsAsBlue)
    fighterBlue: Fighter;

    @ManyToOne(() => Fighter, { nullable: true })
    @Field(() => Fighter, { nullable: true })
    winner?: Fighter | null;


    @Field({ nullable: true })
    @Column({ nullable: true })
    method: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    round: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    time: string;

    @ManyToOne(() => WeightClass, { nullable: true })
    @Field(() => WeightClass, { nullable: true })
    weightClass?: WeightClass;

}
