import React, { Component } from "react";

export default class AddNoteForm extends Component {
    render() {
        return (
            <div className="NoteForm">
                <input className="note-title"
                    type="text"
                    name="noteFormTitle"
                    value={this.props.title}
                    onChange={this.props.onChange}
                    placeholder="Title"
                    spellCheck={false} />
                <textarea className="note-content"
                    name="noteFormContent"
                    value={this.props.content}
                    onChange={this.props.onChange}
                    rows={5}
                    placeholder="Write a note..."
                    spellCheck={false} />
                <div className="btn-container">
                    <input className={["cancel" + (!this.props.editing ? " disabled" : "")]}
                        type="button"
                        name="action"
                        value="Cancel"
                        onClick={this.props.onClick} />
                    <input className="save"
                        type="button"
                        name="action"
                        value="Save"
                        onClick={this.props.onClick} />
                </div>
            </div>
        );
    }
}