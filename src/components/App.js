import React, { Component } from "react";
import "../styles.less";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddNoteForm from "./AddNoteForm";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }
    render() {
        return (
            <div className="App">
                <Navbar />
                <div className="flex-container">
                    <Sidebar />
                    <div className="container">
                        <AddNoteForm />
                    </div>
                </div>
            </div>
        );
    }
}