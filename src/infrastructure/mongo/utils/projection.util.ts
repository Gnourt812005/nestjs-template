import { ProjectionDto } from '@/application/dtos/projection.dto';

export interface PopulateConfig {
  path: string;
  select: string[] | '*';
  fieldMap?: Record<string, string>;
  populate?: Record<string, PopulateConfig>;
  model?: string;
}

export interface ProjectionConfig {
  allowedFields: string[] | '*';
  fieldMap?: Record<string, string>;
  populate?: Record<string, PopulateConfig>;
}

export function parseMongoProjection(
  projection: ProjectionDto,
  config: ProjectionConfig,
): { select?: string; populate?: any[] } {
  // If fields is an array, we normalize it to a key-value record
  const fieldsInput = projection.fields;
  const fieldsMap: Record<string, any> = Array.isArray(fieldsInput)
    ? (fieldsInput as any[]).reduce((acc, current) => {
        acc[current] = {};
        return acc;
      }, {} as Record<string, any>)
    : fieldsInput || {};

  return parseMongoProjectionMap(fieldsMap, config);
}

function parseMongoProjectionMap(
  fieldsMap: Record<string, any>,
  config: ProjectionConfig,
): { select?: string; populate?: any[] } {
  const selectFields: string[] = [];
  const populateOptions: any[] = [];

  Object.keys(fieldsMap).forEach((field) => {
    // Check if it's a populate relation
    if (config.populate && config.populate[field]) {
      const popConfig = config.populate[field];
      const popOption: any = { path: popConfig.path };
      if ((popConfig as any).model) {
        popOption.model = (popConfig as any).model;
      }

      // Map inner select fields if defined
      if (popConfig.select !== '*') {
        const innerSelects = popConfig.select.map((innerField) => {
          if (popConfig.fieldMap && popConfig.fieldMap[innerField]) {
            return popConfig.fieldMap[innerField];
          }
          return innerField;
        });
        popOption.select = innerSelects.join(' ');
      }

      // If the fields map has nested selection for this relation, and the config allows nested population
      const subFieldsMap = fieldsMap[field];
      if (subFieldsMap && Object.keys(subFieldsMap).length > 0 && popConfig.populate) {
        const subResult = parseMongoProjectionMap(subFieldsMap, {
          allowedFields: popConfig.select,
          fieldMap: popConfig.fieldMap,
          populate: popConfig.populate,
        });
        if (subResult.populate && subResult.populate.length > 0) {
          popOption.populate = subResult.populate;
        }
      }

      populateOptions.push(popOption);
    } else {
      // Normal field
      if (config.allowedFields === '*' || config.allowedFields.includes(field)) {
        const mapped = (config.fieldMap && config.fieldMap[field]) || field;
        selectFields.push(mapped === 'id' ? '_id' : mapped);
      }
    }
  });

  return {
    select: selectFields.length > 0 ? selectFields.join(' ') : undefined,
    populate: populateOptions,
  };
}
