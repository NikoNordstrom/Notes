import React, { Component } from "react";
import "../styles.less";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import NoteForm from "./NoteForm";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: this.props.user.displayName,
            notes: this.props.user.notes,
            noteFormTitle: "",
            noteFormContent: "",
            noteFormEditing: false,
            noteFormEditingId: null
        };
        this.onNoteFormChange = this.onNoteFormChange.bind(this);
        this.onNoteFormClick = this.onNoteFormClick.bind(this);
        this.showNote = this.showNote.bind(this);
    }
    onNoteFormChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onNoteFormClick(event) {
        if (this.state.noteFormTitle === "" || this.state.noteFormContent === "") return;
        if (event.target.value.toLowerCase() === "save") {
            fetch("/note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: this.state.noteFormEditingId,
                    editing: this.state.noteFormEditing,
                    date: Date.now(),
                    title: this.state.noteFormTitle,
                    content: this.state.noteFormContent,
                })
            }).then(res => res.json()).then(notes => {
                this.setState({
                    notes: notes
                });
            }).catch(err => console.error(err));
        }
        this.setState({
            noteFormTitle: "",
            noteFormContent: "",
            noteFormEditing: false,
            noteFormEditingId: null
        });
    }
    showNote(event) {
        const index = this.state.notes.findIndex(note => {
            return event.target.id === note._id;
        });
        const note = this.state.notes[index];
        this.setState({
            noteFormTitle: note.title,
            noteFormContent: note.content,
            noteFormEditing: true,
            noteFormEditingId: note._id
        });
    }
    render() {
        return (
            <div className="App">
                <Navbar displayName={this.state.displayName} />
                <div className="flex-container">
                    <Sidebar
                        notes={this.state.notes}
                        showNote={this.showNote} />
                    <div className="container">
                        <NoteForm
                            onChange={this.onNoteFormChange}
                            onClick={this.onNoteFormClick}
                            title={this.state.noteFormTitle}
                            content={this.state.noteFormContent}
                            editing={this.state.noteFormEditing} />
                    </div>
                </div>
            </div>
        );
    }
}