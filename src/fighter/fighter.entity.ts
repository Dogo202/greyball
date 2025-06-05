import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Fight } from '../fight/fight.entity';
import { Event } from '../event/event.entity';

@ObjectType()
@Entity()
export class Fighter {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    nickname?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    country?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    dateOfBirth?: string;

    @Field(() => Float, { nullable: true })
    @Column({ type: 'float', nullable: true })
    height?: number;

    @Field(() => Float, { nullable: true })
    @Column({ type: 'float', nullable: true })
    weight?: number;

    @Field(() => Float, { nullable: true })
    @Column({ type: 'float', nullable: true })
    reach?: number;

    @Field(() => [Fight], { nullable: true })
    @OneToMany(() => Fight, fight => fight.fighterRed)
    fightsAsRed?: Fight[];

    @Field(() => [Fight], { nullable: true })
    @OneToMany(() => Fight, fight => fight.fighterBlue)
    fightsAsBlue?: Fight[];

    @Field(() => Int)
    @Column({ default: 0 })
    wins: number;

    @Field(() => Int)
    @Column({ default: 0 })
    losses: number;

    @Field(() => Int)
    @Column({ default: 0 })
    draws: number;

    @Field(() => Int)
    @Column({ default: 0 })
    knockouts: number;

    @Field(() => Int)
    @Column({ default: 0 })
    submissions: number;

    @Field(() => Int)
    @Column({ default: 0 })
    decisions: number;

    @Field(() => [Event], { nullable: true })
    @ManyToMany(() => Event, event => event.participants)
    events?: Event[];
}
