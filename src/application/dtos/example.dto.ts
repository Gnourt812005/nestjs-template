import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { CursorPaginationRequestSchema } from './pagination.dto';

export const ExampleSchema = z.object({
  // TODO: define input fields
}).strict();

export class ExampleDto extends createZodDto(ExampleSchema) {}

export const ExampleFilterSchema = CursorPaginationRequestSchema.extend({
  // TODO: define filter fields
}).strict();

export class ExampleFilterDto extends createZodDto(ExampleFilterSchema) {}