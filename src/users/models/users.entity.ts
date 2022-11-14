import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User {
    @Field(type => Int)
    @Column()
    id: number;

    @Field(GraphQLISODateTime)
    @Column()
    createdAt: Date;

    @Field({ nullable: true })
    @Column()
    name: string;

    @OneToMany(type => Message, (message: Message) => message.fromUser)
    @Field(type => [Message], { nullable: true })
    messagesFrom?: Message[];

    @Field(type => [Int], { nullable: true })
    @Column()
    friends?: number[];
}
