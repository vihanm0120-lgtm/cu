import { Schema, model, models } from "mongoose";

const NotificationSettingsSchema = new Schema(
  {
    // Freelancer notifications
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    // Client notifications (public link based)
    publicToken: {
      type: String,
      index: true,
    },

    role: {
      type: String,
      enum: ["freelancer", "client"],
      required: true,
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    pushSubscription: {
      type: Object,
      required: true,
    },

    // Freelancer only
    reminderFrequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: null,
    },
  },
  { timestamps: true }
);

export default models.NotificationSettings ||
  model("NotificationSettings", NotificationSettingsSchema);
