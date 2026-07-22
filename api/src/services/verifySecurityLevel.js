import security from "../models/enums/security.js";

const verifySecurityLevel = (password = "") => {
  let secure = security.low;

  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<> ]/.test(password);

  if (password.length >= 8 && hasNumber && hasSpecialChar) {
    secure = security.High;
  }
  //
  else if (password.length >= 6 && hasNumber) {
    secure = security.medium;
  }

  return secure;
};

export default verifySecurityLevel;
