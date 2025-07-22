import React from "react";

export default class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      tempType: false,
    };
  }

  updateCount() {
    console.log(this.tempType);
    this.setState((prevState) => ({
      tempType: !prevState.tempType,
    }));
  }

  render() {
    return (
      <div>
        <button onClick={() => this.updateCount()}>
          {this.state.tempType ? "Convert to Celsius" : "Convert to Fahrenheit"}
        </button>
      </div>
    );
  }
}
