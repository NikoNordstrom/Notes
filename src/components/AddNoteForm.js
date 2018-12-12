import React, { Component } from "react";

export default class AddNoteForm extends Component {
    render() {
        return (
            <form className="AddNoteForm" action="">
                <input className="note-title" type="text" placeholder="Title" />
                <input className="note-content" type="text" placeholder="Write a note..." />
            </form>
        );
    }
}