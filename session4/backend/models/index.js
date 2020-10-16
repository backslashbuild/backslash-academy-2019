const mongoose = require("mongoose");
try {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, { auto_reconnect: true, useUnifiedTopology: true, useNewUrlParser: true });
} catch (e) {
  console.log(e);
}

module.exports = {
  UserModel: require("./UserModel"),
  PostModel: require("./PostModel"),
  CommentModel: require("./CommentModel")
};
