import { Schema, model, models } from "mongoose";

const PublicAccessSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    revoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default models.PublicAccess || model("PublicAccess", PublicAccessSchema);
