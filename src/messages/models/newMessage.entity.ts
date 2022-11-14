import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@InputType('NewMessageInput')
@ObjectType('NewMessage')
@Entity()
export class NewMessage {
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
