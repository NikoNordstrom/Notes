import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"), appReady);

const appReady = () => {
    console.log("appReady function called!");
};