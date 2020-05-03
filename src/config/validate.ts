import Ajv from 'ajv';
import 'ajv-errors';
import {publishSchema, installSchema} from './schema';

type Schema = typeof publishSchema | typeof installSchema;
type ValidationResult = {isValid: boolean; error?: string};

export default (config, schema: Schema): ValidationResult => {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
  });
  const validate = ajv.compile(schema);
  const isValid = validate(config) as boolean;

  return {
    isValid,
    ...(!isValid && {error: ajv.errorsText(validate.errors, {dataVar: '[packagelink.config]', separator: '\n'})}),
  };
};
