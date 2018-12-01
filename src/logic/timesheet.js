export function validate(values) {
  const errors = {};
  const requiredFields = [
    'projectName',
    'taskName',
    'spendTime',
    'taskCompletion'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}
