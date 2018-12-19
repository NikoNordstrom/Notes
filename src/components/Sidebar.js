import React, { Component } from "react";
import Note from "./Note";

export default class Sidebar extends Component {
    render() {
        return (
            <div className={`Sidebar${this.props.disabled ? " disabled" : ""}`}>
                {
                    this.props.notes.map(note => {
                        return <Note
                            key={note._id}
                            date={note.date}
                            title={note.title}
                            content={note.content}
                            id={note._id}
                            showNote={this.props.showNote} />;
                    })
                }
            </div>
        );
    }
}