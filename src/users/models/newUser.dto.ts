import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@InputType('NewUserInput')
export class NewUser {
    @Field(type => Int, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    name: string;

    @Field(type => [Message], { nullable: true })
    messagesFrom?: Message[];

    @Column()
    friends?: number[];
}
