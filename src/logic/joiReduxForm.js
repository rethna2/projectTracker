const Joi = require('joi');

export default function createValidator(schema) {
  return values => {
    const result = Joi.validate(values, schema, { abortEarly: false });
    if (result.error === null) {
      return {};
    }

    const errors = result.error.details.reduce((all, cur) => {
      const allErrors = Object.assign({}, all);
      const path = cur.path[cur.path.length - 1];
      const message = cur.message;
      if (Object.prototype.hasOwnProperty.call(allErrors, path)) {
        allErrors[path] += message;
      } else {
        allErrors[path] = message;
      }
      return allErrors;
    }, {});

    return errors;
  };
}