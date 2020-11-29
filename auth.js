const jwt = require("jsonwebtoken");

const reqAuth = async (req, res, next) => {
  const token = await req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const dectoken = jwt.verify(token, "jana2018");
    req.user = dectoken;
    next();
  } catch (error) {
    res.status(400).send("Invaild Tokken");
    // console.log(error);
  }
};

module.exports = reqAuth;
