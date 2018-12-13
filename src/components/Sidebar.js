import React, { Component } from "react";
import Note from "./Note";

export default class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                <Note title="Note title" date="13.12.2018" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </div>
        );
    }
}