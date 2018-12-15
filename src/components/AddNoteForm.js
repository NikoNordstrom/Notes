import React, { Component } from "react";

export default class AddNoteForm extends Component {
    render() {
        return (
            <form className="AddNoteForm" action="">
                <input className="note-title" type="text" placeholder="Title" />
                <textarea className="note-content" rows={5} placeholder="Write a note..." />
                <div className="btn-container">
                    <button className="cancel">Cancel</button>
                    <button className="save">Save</button>
                </div>
            </form>
        );
    }
}