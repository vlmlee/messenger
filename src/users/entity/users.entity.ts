import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../../messages/entity/messages.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User {
    @Field(type => Int)
    @Column()
    id: number;

    @Field(type =>GraphQLISODateTime)
    @Column()
    createdAt: string;

    @Field({ nullable: true })
    @Column()
    name: string;

    @Field(type => [Int], { nullable: true, defaultValue: [] })
    @Column({ default: [] })
    channelsOwn: Array<number>;

    @Field(type => [Int], { nullable: true, defaultValue: [] })
    @Column({ default: [] })
    channelsParticipatingIn: Array<number>;
}
