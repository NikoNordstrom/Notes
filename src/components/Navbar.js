import React, { Component } from "react";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="Navbar">
                <ul>
                    <i className="material-icons icon">menu</i>
                </ul>
                <ul className="login">
                    <li>Logout</li>
                    <i className="material-icons fab icon">&#xf0d5;</i>
                </ul>
            </nav>
        );
    }
}