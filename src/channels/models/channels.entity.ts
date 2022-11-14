import { Field, GraphQLISODateTime, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Channel {
    @Field(type => [Int])
    @Column()
    participants?: number[];
}
