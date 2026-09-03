import { Field, InputType } from '@nestjs/graphql';

@InputType('NewUserInput')
export class NewUser {
    @Field({ nullable: true })
    name?: string;
}
