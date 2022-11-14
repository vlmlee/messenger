import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './messages/messages.module';
import { UserModule } from './users/users.module';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
    imports: [
        MessageModule,
        UserModule,
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return {
                    name: 'railway',
                    type: 'postgres',
                    logging: true,
                    url: process.env.DATABASE_URL,
                    entities: [__dirname + '/**/**.models{.ts,.js}'],
                    synchronize: true
                };
            }
        }),
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
