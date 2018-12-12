import React, { Component } from "react";
import "../styles.less";
import AddNoteForm from "./AddNoteForm";

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <AddNoteForm />
            </div>
        );
    }
}