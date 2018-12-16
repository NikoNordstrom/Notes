const { Schema } = require("mongoose");

const noteSchema = new Schema({
    date: Number,
    title: String,
    content: String
});

const userSchema = new Schema({
    id: String,
    displayName: String,
    notes: [noteSchema]
});

module.exports = {
    noteSchema: noteSchema,
    userSchema: userSchema
};