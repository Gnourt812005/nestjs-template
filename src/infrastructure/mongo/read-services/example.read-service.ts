import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter, Types } from 'mongoose';
import { Nullable } from '@/core/types';
import { PaginatedResponseDto, SortOrder } from '@/application/dtos/pagination.dto';
import { IExampleReadService } from '@/application/interfaces/read-service/example.read-service.interface';
import { ExampleDto, ExampleFilterDto } from '@/application';
import { ExampleDocument, ExampleModel } from '../schemas';

@Injectable()
export class MongoExampleReadService implements IExampleReadService {
  constructor(
    @InjectModel(ExampleModel.name)
    private readonly exampleModel: Model<ExampleDocument>,
  ) { }

  async findById(id: string): Promise<Nullable<ExampleDto>> {
    const doc = await this.exampleModel.findById(id).populate('user_id').populate('logo_url_id').lean().exec();
    return doc ? this.mapToDto(doc) : null;
  }

  async findAll(filters: ExampleFilterDto = {} as any): Promise<PaginatedResponseDto<ExampleDto>> {
    const { cursor, limit = 10, sort = SortOrder.DESC } = filters;
    const query: QueryFilter<ExampleDocument> = {};

    if (cursor) {
      query._id = sort === SortOrder.DESC ? { $lt: cursor } : { $gt: cursor };
    }

    const docs = await this.exampleModel
      .find(query)
      .sort({ _id: sort === SortOrder.DESC ? -1 : 1 })
      .limit(limit + 1)
      .lean()
      .exec();

    const hasNextPage = docs.length > limit;
    const results = hasNextPage ? docs.slice(0, limit) : docs;
    const nextCursor = hasNextPage ? results[results.length - 1]._id.toString() : null;

    return new PaginatedResponseDto(
      results.map((doc) => this.mapToDto(doc)),
      nextCursor,
      hasNextPage,
      limit,
    );
  }

  private mapToDto(doc: any): ExampleDto {
    return {
    };
  }
}
