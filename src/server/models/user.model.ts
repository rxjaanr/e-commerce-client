import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUND: number = 10;

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.USER,
  },
  login_tokens: {
    type: String,
    default: null,
  },
});

schema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_ROUND, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function (
  candidatePassword: string,
  callback: CallableFunction
) {
  bcrypt.compare(candidatePassword, this.password, function (err, match) {
    if (err) return callback(err);
    callback(null, match);
  });
};

const Users = mongoose.models.user || mongoose.model("user", schema);

export default Users;
