import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const ProjectionSchema = z.object({
  fields: z.union([z.array(z.string()), z.record(z.string(), z.any())]),
  populate: z.array(z.string()).optional(),
}).strict();

export class ProjectionDto extends createZodDto(ProjectionSchema) {}
