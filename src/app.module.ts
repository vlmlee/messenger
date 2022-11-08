import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MessageModule } from './messages/messages.module';
import { UserModule } from './users/users.module';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        MessageModule,
        UserModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
            subscriptions: {
                'graphql-ws': true
            },
            buildSchemaOptions: {
                directives: [
                    new GraphQLDirective({
                        name: 'upper',
                        locations: [DirectiveLocation.FIELD_DEFINITION]
                    })
                ]
            }
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client', 'dist')
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
