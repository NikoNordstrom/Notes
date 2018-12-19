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
            noteFormEditingId: null,
            noteFormDelete: false,
            sidebarDisabled: false
        };
        this.onNoteFormChange = this.onNoteFormChange.bind(this);
        this.onNoteFormClick = this.onNoteFormClick.bind(this);
        this.showNote = this.showNote.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }
    onNoteFormChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onNoteFormClick(event) {
        if (this.state.noteFormTitle === "" || this.state.noteFormContent === "") return;
        const value = event.target.value.toLowerCase();
        if (["save", "delete"].includes(value)) {
            let action = value;
            if (action === "save" && this.state.noteFormEditingId !== null) action = "edit";
            else if (action === "save") action = "create";
            console.log(action);
            fetch("/note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: this.state.noteFormEditingId,
                    action: action,
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
            noteFormEditingId: note._id
        });
    }
    toggleSidebar() {
        this.setState(state => ({
            sidebarDisabled: !state.sidebarDisabled
        }));
    }
    render() {
        return (
            <div className="App">
                <Navbar
                    displayName={this.state.displayName}
                    toggleSidebar={this.toggleSidebar} />
                <div className="flex-container">
                    <Sidebar
                        notes={this.state.notes}
                        showNote={this.showNote}
                        disabled={this.state.sidebarDisabled} />
                    <div className="container">
                        <NoteForm
                            onChange={this.onNoteFormChange}
                            onClick={this.onNoteFormClick}
                            title={this.state.noteFormTitle}
                            content={this.state.noteFormContent}
                            editingId={this.state.noteFormEditingId} />
                    </div>
                </div>
            </div>
        );
    }
}