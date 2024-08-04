import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hook para salvar a senha como uma hash
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Metodo de comparacao de senha
UserSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
