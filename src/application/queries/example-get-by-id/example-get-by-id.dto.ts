import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const ExampleGetByIdSchema = z.object({
  // TODO: define input fields
}).strict();

export class ExampleGetByIdDto extends createZodDto(ExampleGetByIdSchema) {}
