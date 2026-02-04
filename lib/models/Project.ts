import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["on_track", "slight_delay", "blocked"],
      default: "on_track",
    },

    publicToken: {
      type: String,
      unique: true,
      index: true,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
