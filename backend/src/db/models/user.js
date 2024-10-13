import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    city: { type: String, required: false },
    state: { type: String, required: false },
  },
  contactInfo: {
    email: { type: String, required: false },
    phone: { type: String, required: false },
  },
  miscellaneous: { type: String, required: false },
});

userSchema.virtual("id").get(function () {
  return this._id.toString();
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("user", userSchema);
export default User;
