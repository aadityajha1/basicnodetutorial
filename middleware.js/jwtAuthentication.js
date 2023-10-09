const jwt = require("jsonwebtoken");
const jwtBasedAuthentication = (req, res, next) => {
  // Bearer t123123123

  const token = req.headers["authorization"].split(" ")[1];
  if (!token) return res.status(401).send(`Unauthenticated.`);

  const decode = jwt.verify(token, `your-secret-key`);
  console.log(decode);

  //

  req.user = { username: decode.username };
  next();
};

module.exports = jwtBasedAuthentication;
