import validNumberRegex from '../utils/regexValid';

export const ValidateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

export const ValidateInput = (name, value, errors) => {
  switch (name) {
    case 'name': 
      errors.name = value.length < 5
          ? 'Name must be 5 characters long!'
          : '';
      break;
    case 'phoneNumber': 
      errors.phoneNumber = !validNumberRegex.test(value)
          ? 'Phone number is not valid!'
          : '';
      break;
    default:
      break;
  }

  return errors
}
