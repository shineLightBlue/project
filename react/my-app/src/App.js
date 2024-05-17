import React from "react";
const ThemeContext = React.createContext("light");
function App() {
  return (
    <div className="App">
      <App />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
function Button() {
  return <div style="width:300px;height:300px;background:'red'"></div>;
}

export default App;
