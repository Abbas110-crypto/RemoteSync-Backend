import mongoose, { Schema } from "mongoose";

// Define screenshot schema first
const screenshotSchema = new mongoose.Schema({
  data: Buffer,
  uploadedAt: { type: Date, default: Date.now },
  username: { type: String, required: true }, // Store username info
});

// Define task schema
const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    screenshots: [screenshotSchema], // Now, screenshotSchema is defined before use
    date: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: "normal",
      enum: ["high", "medium", "normal", "low"],
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress", "completed"],
    },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    
    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
        isCompleted: Boolean,
      },
    ],
    description: String,
    assets: [{ type: String }],
    links: [String],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Export Task model
const Task = mongoose.model("Task", taskSchema);
export default Task;
