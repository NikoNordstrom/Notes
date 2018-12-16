import React, { Component } from "react";

export default class Note extends Component {
    render() {
        return (
            <div className="Note">
                <div className="title">
                    {this.props.title}
                    <span className="date">{new Date(this.props.date).toLocaleDateString()}</span>
                </div>
                <div className="content">{this.props.content}</div>
                <div className="icons">
                    <i className="material-icons icon"
                        id={this.props.id}
                        onClick={this.props.showNote}>arrow_forward</i>
                </div>
            </div>
        );
    }
}