import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Fighter } from '../fighter/fighter.entity';
import { Fight } from '../fight/fight.entity';

@ObjectType()
@Entity()
export class Event {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    location: string;

    @Field()
    @Column({ type: 'date' })
    date: string;

    @Field(() => [Fighter])
    @ManyToMany(() => Fighter, fighter => fighter.events)
    @JoinTable({
        name: 'fighter_events_event',
        joinColumn: { name: 'eventId', referencedColumnName: 'id' },           // Event.id
        inverseJoinColumn: { name: 'fighterId', referencedColumnName: 'id' },  // Fighter.id
    })
    participants: Fighter[];

    @Field(() => [Fight])
    @OneToMany(() => Fight, fight => fight.event)
    fights: Fight[];
}
