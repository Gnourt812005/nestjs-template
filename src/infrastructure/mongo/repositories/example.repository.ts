import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ClientSession } from 'mongoose';
import { IExampleRepository } from '@/core/interfaces/repositories';
import { ExampleRoot } from '@/core/aggregate-roots';
import { ExampleModel, ExampleDocument } from '../schemas';
import { type IUnitOfWork, UNIT_OF_WORK } from '@/application/interfaces';
import { MongoUnitOfWork } from '../mongo-uow';
import { Nullable } from '@/core/types';

@Injectable()
export class MongoExampleRepository implements IExampleRepository {
  constructor(
    @InjectModel(ExampleModel.name)
    private readonly exampleModel: Model<ExampleDocument>,
    @Inject(UNIT_OF_WORK)
    private readonly uow: IUnitOfWork,
  ) { }

  private get session(): ClientSession | undefined {
    return (this.uow as MongoUnitOfWork).getSession() || undefined;
  }


  async findById(id: string): Promise<Nullable<ExampleRoot>> {
    const doc = await this.exampleModel.findById(id).session(this.session).exec();
    return doc ? this.mapToDomain(doc) : null;
  }

  async save(example: ExampleRoot): Promise<void> {
    const data = this.mapToPersistence(example);

    if (!example.id) {
      const created = new this.exampleModel(data);
      const saved = await created.save({ session: this.session });
      example.setId(saved._id.toString());
    } else {
      await this.exampleModel.findByIdAndUpdate(example.id, data, { upsert: true }).session(this.session).exec();
    }
  }

  async saveMany(examples: ExampleRoot[]): Promise<void> {
    await Promise.all(examples.map(e => this.save(e)));
  }

  async delete(id: string): Promise<void> {
    await this.exampleModel.findByIdAndDelete(id).session(this.session).exec();
  }

  // TODO: implement repository methods (e.g., findById, save, delete)

  private mapToDomain(doc: ExampleDocument): ExampleRoot {
    if (!doc._id) {
      throw new Error('Example document ID is missing');
    }
    return ExampleRoot.instantiate(doc._id.toString(), {
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
      // map other properties as needed
    });
  }

  private mapToPersistence(example: ExampleRoot): Omit<ExampleModel, 'created_at' | 'updated_at'> {
    return {

    };
  }
}

