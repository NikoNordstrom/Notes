import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

fetch("/user").then(res => res.json()).then(user => {
    ReactDOM.render(<App user={user} />, document.getElementById("root"), appReady);
}).catch(err => console.error(err));

const appReady = () => {
    console.log("App component successfully rendered!");
};