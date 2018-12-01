export function validate(values) {
  const errors = {};
  const requiredFields = [
    'name',
    'description',
    'ponits',
    'status',
    'assignedTo'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
}
