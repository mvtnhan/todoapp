import React from "react";
import "./scss/reset.scss";
import "./App.scss";

import TodoHeader from "./components/todo-header.js";
import TodoItem from "./components/todo-item.js";
import TodoItem2 from "./components/todo-item.js";
import TodoFooter from "./components/todo-footer.js";

function App() {
  return (
    <div className="todo">
      <h1 className="title">Todos</h1>
      {TodoHeader()}
      {TodoItem()}
      {TodoItem2()}
      {TodoFooter()}
    </div>
  );
}

export default App;
