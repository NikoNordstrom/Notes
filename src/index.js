import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

fetch("/user").then(res => {
    return res.json();
}).then(user => {
    ReactDOM.render(<App user={user} />, document.getElementById("root"), appReady);
});

const appReady = () => {
    console.log("appReady function called!");
};