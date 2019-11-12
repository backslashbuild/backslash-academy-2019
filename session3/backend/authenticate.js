const jwt = require("jsonwebtoken");

module.exports = {
  requireAuth: (req, res, next) => {
    console.log(req.headers);
    console.log(req.headers.authorization);

    if (!req.headers.authorization) {
      return res.status(401).send();
    }

    const [authType, token] = req.headers.authorization.split(" ");

    if (authType != "Bearer" || token != "hello") {
      return res.status(401).send();
    }

    return next();
  }
};
