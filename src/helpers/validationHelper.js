import {
  validateEmail,
  validatePassword,
  validateUserName,
  validatephoneNumber,
  validateEmpty,
  sanitizeInput
} from "./validationRules.js";

export const registerValidationHelper = ({
  email,
  userName,
  password,
  confirmPassword,
  phoneNumber
}) => {
  const validatedInputs = {
    validEmail: validateEmail(email),
    validUserName: validateUserName(userName),
    validPassword: validatePassword(password),
    validConfirmPassword: confirmPassword === password,
    validPhoneNumber: validatephoneNumber(phoneNumber)
  };
  return validatedInputs;
};

export const signInValidationHelper = ({ email, userName, password }) => {
  const validatedInputs = {
    validPassword: validatePassword(password)
  };
  if (email) {
    validatedInputs.validEmail = validateEmail(email);
  } else {
    validatedInputs.validUserName = validateUserName(userName);
  }
  return validatedInputs;
};

export const createReminderValidationHelper = ({ content, date }) => {
  const validatedInputs = {
    validContent: validateEmpty(content) && sanitizeInput(content),
    validDate: validateEmpty(date)
  };
  return validatedInputs;
};
