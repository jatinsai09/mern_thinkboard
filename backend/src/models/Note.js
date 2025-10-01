import mongoose from 'mongoose';

// 1- create a schema
// 2- model based off of that schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true // automatically adds createdAt and updatedAt fields
});

const Note = mongoose.model('Note', noteSchema);

export default Note;