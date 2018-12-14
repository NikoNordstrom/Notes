import React, { Component } from "react";

export default class Note extends Component {
    render() {
        return (
            <div className="Note">
                <div className="title">
                    {this.props.title}
                    <span className="date">{this.props.date}</span>
                </div>
                <div className="content">{this.props.content}</div>
                <div className="icons">
                    <i className="material-icons icon">arrow_forward</i>
                </div>
            </div>
        );
    }
}