import { Field, GraphQLISODateTime, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';

@InputType('MessageInput')
@ObjectType()
@Entity()
export class Message {
    @Field(type => Int)
    @Column()
    id: number;

    @Field(GraphQLISODateTime)
    @Column()
    createdAt: Date;

    @Field()
    @Column()
    content: string;

    @Field(type => Int)
    @Column()
    fromUser?: number;

    @Field(type => Int)
    @Column()
    toUser?: number;
}
