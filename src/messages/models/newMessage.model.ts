import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('NewMessage')
export class NewMessage {
    @Field()
    content: string;
}
