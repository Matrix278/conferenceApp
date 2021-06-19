import React from "react";
import "./App.css";
import NavigationSwitcher from "./components/NavigationSwitcher";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationSwitcher />
      </div>
    );
  }
}
