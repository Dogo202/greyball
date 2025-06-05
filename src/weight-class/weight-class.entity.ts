import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class WeightClass {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => Float, { nullable: true })
    @Column({ type: 'numeric', nullable: true })
    min_weight: number;

    @Field(() => Float, { nullable: true })
    @Column({ type: 'numeric', nullable: true })
    max_weight: number;
}
