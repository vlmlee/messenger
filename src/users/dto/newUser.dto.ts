import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('NewUserInput')
export class NewUser {
    @Field()
    name: string;
}
