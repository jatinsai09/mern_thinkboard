import Note from "../models/Note.js";

const getAllNotes = async (req, res) => {
  try {
    // const notes = await Note.find().sort({ createdAt: -1 }); // newest first
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    //const note = await Note.findById(req.params.id);
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(201).json({
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    // const newNote = new Note({ title, content});
    const newNote = new Note({ title, content, user: req.user._id });

    const savedNote = await newNote.save();
    res.status(201).json({
      message: "Note created successfully",
      data: savedNote,
    });
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // const updatedNote = await Note.findByIdAndUpdate(
    //   req.params.id,
    //   { title, content },
    //   { new: true },
    // );
    // if (!updatedNote) {
    //   return res.status(404).json({
    //     message: "Note not found",
    //   });
    // }

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();

    res.status(201).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    // const deletedNote = await Note.findByIdAndDelete(req.params.id);
    // if (!deletedNote) {
    //   return res.status(404).json({
    //     message: "Note not found",
    //   });
    // }

    const deletedNote = await Note.findById(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (deletedNote.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await deletedNote.deleteOne();

    res.status(201).json({
      message: "Note deleted successfully!",
      data: deletedNote,
    });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
