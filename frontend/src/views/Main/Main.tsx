import React from "react";
import Button from "@material-ui/core/Button";

const Main: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
};

export default Main;
