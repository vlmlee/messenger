import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Channel {
    @Field(type => Int)
    @Column()
    id: number;

    @Field(type => Int)
    @Column()
    createdBy: number;

    @Field(type => [Int])
    @Column()
    participants: Array<number | undefined>;
}
