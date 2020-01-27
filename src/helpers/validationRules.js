import validator from "validator";

export const validateEmail = data =>
  !validator.isEmpty(data) && validator.isEmail(data);

export const validatePassword = data =>
  !validator.isEmpty(data) &&
  validator.isLength(data, { min: 8, max: 15 }) &&
  validator.isAlphanumeric(data);

export const validateUserName = data =>
  !validator.isEmpty(data) &&
  validator.isLength(data, { min: 4 }) &&
  validator.isAlphanumeric(data);

export const validatephoneNumber = data =>
  !validator.isEmpty(data) &&
  validator.isLength(data, { min: 10, max: 10 }) &&
  validator.isNumeric(data, { no_symbols: true });

export const validateEmpty = data => !validator.isEmpty(data);

export const sanitizeInput = data => validator.whitelist(data, /[A-z0-9 .,$?!]/g);
