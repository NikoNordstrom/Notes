import React, { Component } from "react";
import "../styles.less";
import Sidebar from "./Sidebar";
import AddNoteForm from "./AddNoteForm";

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Sidebar />
                <div className="container">
                    <AddNoteForm />
                </div>
            </div>
        );
    }
}