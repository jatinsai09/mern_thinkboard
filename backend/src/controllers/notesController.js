import Note from '../models/Note.js';

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.status(201).json({
            message: "Note retrieved successfully",
            data: note
        });
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const newNote = new Note({ title, content });

        const savedNote = await newNote.save();
        res.status(201).json({
            message: "Note created successfully",
            data: savedNote
        });
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, { new: true });
        if(!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(201).json({
            message: "Note updated successfully",
            data: updatedNote
        })
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }   
}

const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.status(201).json({
            message: "Note deleted successfully!",
            data: deletedNote
        })
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
    res.status(200).json({
        message: "Note deleted successfully!"
    });
}

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };