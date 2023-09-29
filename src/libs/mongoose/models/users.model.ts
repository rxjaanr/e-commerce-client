import mongoose from "mongoose";
import bcrypt from "bcrypt";

enum userRole {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
    },
    address: {
      type: String,
      required: true,
      minLength: 5,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: [6, "Password is too short"],
      required: true,
    },
    role: {
      type: String,
      enum: userRole,
      default: userRole.CUSTOMER,
    },
    bank_account: {
      type: String || null,
      default: null,
    },
    login_tokens: {
      type: String || null,
      default: null,
    },
  },
  {
    timestamps: false,
    autoIndex: true,
  }
);

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: CallableFunction
) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

type tUser = mongoose.InferSchemaType<typeof userSchema>;

const Users = mongoose.models.user || mongoose.model<tUser>("user", userSchema);

export default Users;
