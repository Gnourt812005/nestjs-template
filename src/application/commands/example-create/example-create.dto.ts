import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const ExampleCreateSchema = z.object({
  // TODO: define input fields
}).strict();

export class ExampleCreateDto extends createZodDto(ExampleCreateSchema) {}
