import * as React from "react";
import "./app.scss";

import Content from "./components/Content/Content";

const App: React.FC = () => {
  return (
    <main className="app">
      <Content />
    </main>
  );
};

export default App;
