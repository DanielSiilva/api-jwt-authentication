import mongoose, { Document, Schema } from "mongoose";

interface IRefreshToken extends Document {
  token: string;
  userId: string;
}

const RefreshTokenSchema: Schema<IRefreshToken> = new Schema({
  token: { type: String, required: true },
  userId: { type: String, required: true },
});

const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema
);
export default RefreshToken;
