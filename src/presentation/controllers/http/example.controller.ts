import { ExampleCreateDto } from '@/application/commands';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

@ApiTags('examples')
@ApiBearerAuth()
@ApiSecurity('x-api-key')
@Controller('examples')
export class ExampleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }
  
  @Post()
  async create(@Body() dto: ExampleCreateDto) {
    // TODO: dispatch appropriate command
    return this.commandBus.execute(dto);
  }

  @Get()
  async findAll() {
    // TODO: dispatch appropriate query
    return this.queryBus.execute({});
  }
}
