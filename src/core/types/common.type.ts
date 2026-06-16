export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type OptionalNullable<T> = T | null | undefined;

export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

export type JsonObject = { [key: string]: JsonValue };
