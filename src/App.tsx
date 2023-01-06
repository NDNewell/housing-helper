import * as React from "react";
import "./app.scss";

import Content from "./components/Content/Content";

const App: React.FC = () => {
  return (
    <div className="app">
      <Content />
    </div>
  );
};

export default App;
