import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function expectSchema<TSchema extends object>(schema: TSchema, data: unknown) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    throw new Error(`JSON Schema inválido: ${JSON.stringify(validate.errors, null, 2)}`);
  }
}
