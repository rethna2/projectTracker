export function validate(values) {
  const errors = {};
  const requiredFields = ['name', 'emailId', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}
