import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/models/messages.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@InputType('NewUserInput')
@Entity()
export class NewUser {
    @Field(type => Int, { nullable: true })
    @Column()
    id?: number;

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
