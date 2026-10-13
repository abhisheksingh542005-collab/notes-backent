import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Work", "Personal", "Study", "Ideas", "General"],
    default: "General"
  },
  tags: {
    type: [String], // Extra: Multiple tags jaise ['react', 'urgent', 'backend']
    default: []
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false // Extra: Note ko archive ya hide karne ke liye
  },
  color: {
    type: String,
    default: "#ffffff" // Notes background color customization
  },
  isDeleted: {
  type: Boolean,
  default: false
  },
  dueDate: {
  type: Date,
  default: null
  },
  userId: {
  type: String, // isko ObjectId se hata kar String kar do
  default: "default_user"
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  pin: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);

 


 

