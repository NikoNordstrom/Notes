import React, { Component } from "react";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="Navbar">
                <ul>
                    <i className="material-icons icon" onClick={this.props.toggleSidebar}>menu</i>
                </ul>
                <ul>
                    <li><b>{this.props.displayName}</b></li>
                </ul>
                <ul className="logout">
                    <a href="/logout" className="material-icons icon" title="Logout">power_settings_new</a>
                </ul>
            </nav>
        );
    }
}