import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MessageModule } from './messages/messages.module';
import { UserModule } from './users/users.module';

@Module({
    imports: [
        MessageModule,
        UserModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
