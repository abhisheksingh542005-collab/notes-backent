import Note from "../models/note.js";

// 1. Create Note (POST)
export const createNote = async (req, res) => {
  try {
    const { title, description, userId, folder, isLocked, pin, category, color, tags } = req.body;
    
    const newNote = new Note({
      title,
      description,
      userId: req.user?._id || req.body.userId || "default_user", // Agar userId nahi hai toh default pass kar dega
      folder: folder || category || "General",
      isLocked: isLocked || false,
      category: category || "General",
      pin: pin || "",
      color,
      tags
    });

    await newNote.save();
    res.status(201).json({ success: true, note: newNote });
  } catch (err) {
    console.log("Error creating note:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Get all notes for user (GET)
export const getNotes = async (req, res) => {
  try {
    // 1. userId extract karne ke saare ways fallback me rakho
    const userId = req.params.userId || req.user?._id || req.query.userId;

    // 2. Query ko smart banao
    let query = {};
    if (userId) {
      query.$or = [{ userId }, { userId: "default_user" }];
    }

    const { search, category, isPinned, isArchived, tag } = req.query;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (isPinned !== undefined) {
      query.isPinned = isPinned === "true";
    }

    if (isArchived !== undefined) {
      query.isArchived = isArchived === "true";
    }

    if (tag) {
      query.tags = tag;
    }

    const notes = await Note.find(query).sort({ isPinned: -1, createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//updatenote
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, color, tags } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description, category, color, tags },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, note: updatedNote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//toggle pin note
export const togglePinNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    note.isPinned = !note.isPinned;
    await note.save({ validateBeforeSave: false }); // <-- validateBeforeSave: false lagane se ye error nahi aayega

    return res.status(200).json({ success: true, note });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//toggle archieve note
export const toggleArchiveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    note.isArchived = !note.isArchived;
    await note.save({ validateBeforeSave: false }); // <-- Yahan ye add karna hai

    return res.status(200).json({ success: true, note });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//deleteNote
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
