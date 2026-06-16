import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ExampleCreateCommand } from './example-create.command';

@CommandHandler(ExampleCreateCommand)
export class ExampleCreateCommandHandler implements ICommandHandler<ExampleCreateCommand, any> {
  async execute(command: ExampleCreateCommand): Promise<any> {
    // TODO: implement command handling
    return {};
  }
}
