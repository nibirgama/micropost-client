export const _STATUS = {
  ACCESS_DENIED: 403,
  VALIDATION_FAILED: 400, //validation error
  SIGNIN_TYPE: 408, //wrong sign in type error
  DUPLICATE_EMAIL_ID: 409, //Duplicate email id
  REGISTRATION_INITIATED: "REGISTRATION_INITIATED", //Success
  UNAUTHENTICATED: 404, //user not found
  ID_OR_PASS_NOT_FOUND: 401, //user not found
  MAX_LIMIT_EXCEEDED: 413,
  MAX_LIMIT_EXCEEDED_PREMIUM: 513,
  MEMBER_ALREADY_EXISTS_CODE: 502,
  ALREADY_REGISTERED: "already_registered",
  UNKNOWN: "unknown",
  USER_NOT_FOUND: "user_not_found",
  PASSWORD_INCONSISTENCY: "password_inconsistency",
  IDTOKEN_INVALID: "idToken_invalid",
  EMAIL_PRIVATE: "email_private",
  REGISTERED_WITH_DIFFERENT_METHOD: "registered_with_different_method",
  USER_PASSWORD_NOT_MATCHED: "user_password_not_matched",
  TOKEN_INVALID: "token_invalid",
  TOKEN_EMPTY: "token_empty",
  PASSWORD_EMPTY: "password_empty",
  PASSWORD_INVALID: "password_invalid",
  CONFIRMPASSWORD_EMPTY: "confirmPassword_empty",
  CONFIRMPASSWORD_INVALID: "confirmPassword_invalid",
  EMAIL_EMPTY: "email_empty",
  EMAIL_INVALID: "email_invalid",
  NAME_EMPTY: "name_empty",
  GRANT_TYPE_EMPTY: "grant_type_empty",
  PROJECTID_EMPTY: "projectId_empty",
  PROJECT_NOT_FOUND: "project_not_found",
  MEMBER_NOT_FOUND: "member_not_found",
  MEMBER_ALREADY_EXISTS: "member_already_exists", //member_already_exists
};

export function _isStatus(arr, status) {
  return arr.indexOf(status) >= 0;
}
