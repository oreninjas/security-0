import { Schema, mongoose } from "mongoose";

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const user = mongoose.model("user", userSchema);

export default user;
