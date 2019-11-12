const jwt = require("jsonwebtoken");

const token = jwt.sign({ data: "foobar" }, "secret", { expiresIn: 60 * 60 });

console.log("TOKEN: " + token);

jwt.verify(token, "secret", function(err, decoded) {
  console.log("DECOEDED: " + decoded.data);
});
