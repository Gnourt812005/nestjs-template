import { Module } from '@nestjs/common';
import { EXAMPLE_REPOSITORY } from '@/core/interfaces/repositories/example.repository';
import { ExampleController } from '@/presentation/controllers';

@Module({
  imports: [],
  controllers: [ExampleController],
  providers: [],
  exports: [EXAMPLE_REPOSITORY],
})
export class ExampleModule {}
