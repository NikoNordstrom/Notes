const { Schema } = require("mongoose");

const noteSchema = new Schema({
    date: Date,
    title: String,
    content: String
});

const userSchema = new Schema({
    id: String,
    displayName: String,
    created: Date,
    lastLogin: Date,
    notes: [noteSchema]
});

module.exports = {
    noteSchema: noteSchema,
    userSchema: userSchema
};