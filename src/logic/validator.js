import * as yup from 'yup';

export function createValidator(formName, ...props) {
  switch (formName) {
    case 'register':
      return validate(registerSchema);
    case 'login':
      return validate(loginSchema);
    case 'forgotPassword':
      return validate(forgotPasswordSchema);
    case 'resetPassword':
      return validate(resetPasswordSchema);
    case 'project':
      return validate(projectSchema);
    case 'task':
      return validate(taskSchema);
    case 'logTime':
      return validate(logTimeSchema(...props));
    default:
      throw new Error('Invalid formName');
  }
}

export function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validate(schema) {
  return values => {
    let error;
    try {
      const result = schema.validateSync(values, { abortEarly: true });
    } catch (e) {
      console.log('error', e);
      error = {
        [e.path]: e.message
      };
    }
    console.log('next');
    return error;
  };
}

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(6)
    .max(30)
    .required(),
  emailId: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

const loginSchema = yup.object().shape({
  emailId: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

const forgotPasswordSchema = yup.object().shape({
  emailId: yup
    .string()
    .email()
    .required()
});

const resetPasswordSchema = yup.object().shape({
  password: yup.string().required()
});

const projectSchema = yup.object().shape({
  name: yup
    .string()
    .min(6)
    .max(30)
    .required(),
  description: yup.string(),
  team: yup.array().of(yup.string())
  //.required()
});

const taskSchema = yup.object().shape({
  name: yup
    .string()
    .min(6)
    .max(255)
    .required(),
  description: yup
    .string()
    .min(6)
    .max(3000),
  points: yup.number(),
  status: yup.string().matches(/(backlog|new|wip|review|done)/),
  assignedTo: yup.string()
});

const logTimeSchema = (task, initialValues) =>
  yup.object().shape({
    timeSpent: yup
      .number()
      .min(0)
      .max(8),
    pointsDone: yup
      .number()
      .min(0)
      .max(
        task.points -
          task.pointsDone +
          ((initialValues && initialValues.pointsDone) || 0)
      )
      .label('Must be less than total points'),
    comments: yup
      .string()
      .min(6)
      .max(3000)
  });
