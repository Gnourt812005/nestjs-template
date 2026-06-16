import { Schema } from 'mongoose';

export function softDeletePlugin(schema: Schema) {
  schema.pre('find', function () {
    const filter = this.getFilter();
    if (filter.delete_at === undefined && filter.isDeleted === undefined) {
      this.where({
        $or: [
          { delete_at: null },
          { delete_at: { $exists: false } }
        ]
      });
    }
  });

  schema.pre('findOne', function () {
    const filter = this.getFilter();
    if (filter.delete_at === undefined && filter.isDeleted === undefined) {
      this.where({
        $or: [
          { delete_at: null },
          { delete_at: { $exists: false } }
        ]
      });
    }
  });

  schema.pre('countDocuments', function () {
    const filter = this.getFilter();
    if (filter.delete_at === undefined && filter.isDeleted === undefined) {
      this.where({
        $or: [
          { delete_at: null },
          { delete_at: { $exists: false } }
        ]
      });
    }
  });
}
