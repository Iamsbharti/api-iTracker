const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(11);
  return await bcrypt.hash(password, salt);
};
const comparePassword = async (pwd, hashedPwd) => {
  return await bcrypt.compare(pwd, hashedPwd);
};

module.exports = {
  hashPassword,
  comparePassword,
};
