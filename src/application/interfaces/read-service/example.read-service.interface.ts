import { IBaseReadService } from './base.read-service.interface';
import { ExampleDto } from '@/application/dtos';
import { ExampleFilterDto } from '@/application/dtos';

export interface IExampleReadService extends IBaseReadService<ExampleDto, ExampleFilterDto> {
}

export const EXAMPLE_READ_SERVICE = Symbol('IExampleReadService');
