const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SIGNING_KEY;

module.exports = {
  createToken: userId => {
    return jwt.sign({ userId }, secret);
  },

  requireAuth: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send();
    }

    const [authType, token] = req.headers.authorization.split(" ");

    if (authType != "Bearer") {
      return res.status(401).send();
    }

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(401).send();
      }

      const { userId } = decoded;

      if (!userId) {
        return res.status(401).send();
      }

      req.user = decoded.userId;

      return next();
    });
  }
};
