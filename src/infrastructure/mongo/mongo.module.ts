import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MongoUnitOfWork } from './mongo-uow';
import { UNIT_OF_WORK } from '@/application/interfaces';
import { ExampleModel, ExampleSchema } from './schemas';

// Repository imports
import {
} from './repositories';

// Read Service imports
import {
} from './read-services';

// Repository symbols
import { EXAMPLE_REPOSITORY } from '@/core/interfaces/repositories';

// Read Service symbols
import {
} from '@/application/interfaces';
import { MongoExampleRepository } from './repositories/example.repository';
import { EXAMPLE_READ_SERVICE } from '@/application/interfaces/read-service/example.read-service.interface';
import { MongoExampleReadService } from './read-services/example.read-service';


@Global()
@Module({
  imports: [
    // Root MongoDB connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    // Register ALL schemas here
    MongooseModule.forFeature([
      {  name: ExampleModel.name, schema: ExampleSchema },
    ]),
  ],
  providers: [
    // Unit of Work
    {
      provide: UNIT_OF_WORK,
      useClass: MongoUnitOfWork,
    },
    // All Repositories
    {
      provide: EXAMPLE_REPOSITORY,
      useClass: MongoExampleRepository,
    },
    // All Read Services
    {
      provide: EXAMPLE_READ_SERVICE,
      useClass: MongoExampleReadService,
    }
  ],
  exports: [
    UNIT_OF_WORK,
    // Export all repository tokens
    EXAMPLE_REPOSITORY,
    // Export all read service tokens
    EXAMPLE_READ_SERVICE,
    // Export MongooseModule so domain modules can use the models if needed
    MongooseModule,
  ],
})
export class MongoModule {}