import React from "react";
import "./App.css";

import TodoHeader from "./components/header.js";
import TodoItems from "./components/items.js";
import TodoFooter from "./components/footer.js";

function App() {
  return (
    <div className="todo">
      {TodoHeader()}
      {TodoItems()}
      {TodoFooter()}
    </div>
  );
}

export default App;
