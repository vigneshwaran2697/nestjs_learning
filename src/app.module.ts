import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import dbConfig from './database/db.config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLDate } from 'graphql-scalars';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './graphqlschema.gql',
      driver: ApolloDriver,
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
      buildSchemaOptions: {
        scalarsMap: [{ type: () => GraphQLDate, scalar: GraphQLDate }],
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [dbConfig],
    }),
    DatabaseModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
