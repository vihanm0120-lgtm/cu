import { Schema, model, models } from "mongoose";

const UpdateSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    completed: {
      type: String,
      default: "",
    },

    inProgress: {
      type: String,
      default: "",
    },

    comingNext: {
      type: String,
      default: "",
    },

    blockers: {
      type: String,
      default: "",
    },

    isDraft: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default models.Update || model("Update", UpdateSchema);
