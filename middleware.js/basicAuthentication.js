const basicAuthentication = (req, res, next) => {
  // const {username, password} = req.body
  // btoa(`${username}:${password}`)
  const token = req.headers["authorization"];
  console.log(`token: ${token}`);
  console.log(req.headers);
  if (!token) return res.status(401).send(`Unauthenticated`);
  const decoded = Buffer.from(token, "base64").toString("utf-8");
  console.log(decoded);
  console.log(atob(token));
  const [username, password] = decoded.split(":"); //atob(token).split(":");
  console.log(username, password);

  // check username and password in database code goes here.

  if (username === "admin" && password === "admin123") {
    next();
  } else {
    res.status(401).send(`Unauthenticated.`);
  }
};

module.exports = basicAuthentication;
