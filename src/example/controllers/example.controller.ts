import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ExampleService } from '../services/example.service';

@ApiTags('examples')
@Controller('examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  async findAll() {
    return this.exampleService.findAll();
  }

  @Post()
  async create(@Body() body: any) {
    return this.exampleService.create(body);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.exampleService.findById(id);
  }
}