const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  //passport will create the user automatically
  username: {
    type: String
  },

  password: {
    type: String
  },

  country: {
    type: String
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
