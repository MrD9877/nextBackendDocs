import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
