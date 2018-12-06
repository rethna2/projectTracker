const Joi = require('joi');

export function createValidator(formName, ...props) {
  let schema;
  console.log('formName', formName);
  switch (formName) {
    case 'register':
      schema = registerSchema;
      break;
    case 'login':
      schema = loginSchema;
      break;
    case 'forgotPassword':
      schema = forgotPasswordSchema;
      break;
    case 'resetPassword':
      schema = resetPasswordSchema;
      break;
    case 'project':
      schema = projectSchema;
      break;
    case 'task':
      schema = taskSchema;
      break;
    case 'logTime':
      schema = logTimeSchema(...props);
      break;
    default:
      throw new Error('Invalid formName');
  }
  return validate(schema);
}

export function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validate(schema) {
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
        if (message.indexOf(`"${path}"`) === -1) {
          allErrors[path] = message.match(/".*"/);
        } else {
          allErrors[path] = message;
        }
      }
      return allErrors;
    }, {});

    return errors;
  };
}

const registerSchema = {
  name: Joi.string()
    .min(6)
    .max(30)
    .required(),
  emailId: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
};

const loginSchema = {
  emailId: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
};

const forgotPasswordSchema = {
  emailId: Joi.string()
    .email()
    .required()
};

const resetPasswordSchema = {
  password: Joi.string().required()
};

const projectSchema = {
  name: Joi.string()
    .min(6)
    .max(30)
    .required(),
  description: Joi.string(),
  team: Joi.array()
    .items(Joi.string())
    .required()
};

const taskSchema = {
  name: Joi.string()
    .min(6)
    .max(255)
    .required(),
  description: Joi.string()
    .min(6)
    .max(3000),
  points: Joi.number(),
  status: Joi.string().valid(['backlog', 'new', 'wip', 'review', 'done']),
  assignedTo: Joi.string()
};

const logTimeSchema = (task, initialValues) => ({
  timeSpent: Joi.number()
    .min(0)
    .max(8),
  pointsDone: Joi.number()
    .min(0)
    .max(
      task.points -
        task.pointsDone +
        ((initialValues && initialValues.pointsDone) || 0)
    )
    .label('Must be less than total points'),
  //date: Joi.date(),
  comments: Joi.string()
    .min(6)
    .max(3000)
});
