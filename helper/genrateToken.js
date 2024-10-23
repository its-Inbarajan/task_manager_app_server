const jsonwebtoken = require("jsonwebtoken");

const genrateToke = async (payload) => {
  const token = await jsonwebtoken.sign(payload, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  return token;
};

module.exports = {
  genrateToke,
};
