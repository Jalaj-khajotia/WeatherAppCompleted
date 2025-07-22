import "./styles.css";
import Swr from "./Swr";
import React from "react";
import Temp from "./Temp";

export default class App extends React.Component {
  //export default function App()
  constructor() {
    super();
    this.state = {
      tempType: false,
    };
  }

  updateCount() {
    //console.log(this.tempType);
    this.setState((prevState) => ({
      tempType: !prevState.tempType,
    }));
  }

  render() {
    this.temp = false;
    return (
      <div className="App">
        {/* <h1>Hello Jalaj</h1> */}
        <div></div>
        <svg
          className="temp"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-thermometer"
          viewBox="0 0 16 16"
        >
          <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
          <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z" />
        </svg>{" "}
        Stats
        <Temp temperatureType={this.state.tempType} />
        <br />
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => this.updateCount()}
        >
          {this.state.tempType ? "Show in Celsius" : "Show in Fahrenheit"}
        </button>
        {/* <Swr temp={this.state.tempType ? this.state.tempType : false} /> */}
      </div>
    );
  }
}
