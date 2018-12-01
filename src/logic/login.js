export function validate(values) {
  const errors = {};
  const requiredFields = ['name', 'emailId'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}
