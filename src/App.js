import React from "react";
import "./App.css";

function App() {
  return (
    <div className="todo">
      <div className="header">
        <h1>Todos</h1>
        {/* <button className="btn-todo" /> */}
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
        />
      </div>

      <div className="item">
        <input className="toggle-all" type="checkbox" />
        <label for="toggle-all" />
        <ul className="todo-list">
          <li>
            <div className="view">
              <input className="toggle" type="checkbox"></input>
              <label>Todo one</label>
              <button className="delete"></button>
            </div>
            <input className="edit" value="Item1"></input>
          </li>
          <li>
            <div className="view">
              <input className="toggle" type="checkbox"></input>
              <label>Todo two</label>
              <button className="delete"></button>
            </div>
            <input className="edit" value="Item1"></input>
          </li>
          <li>
            <div className="view">
              <input className="toggle" type="checkbox"></input>
              <label>Todo three</label>
              <button className="delete"></button>
            </div>
            <input className="edit" value="Item1"></input>
          </li>
        </ul>
      </div>

      <div className="footer">
        <span className="todo-count">
          <strong>1</strong>
          <span> </span>
          <span>item</span>
          <span> left</span>
        </span>
        <ul className="filters">
          <li>
            <a href="#/">All</a>
          </li>
          <span> </span>
          <li>
            <a href="#/active">Active</a>
          </li>
          <span> </span>
          <li>
            <a href="#/completed">Complected</a>
          </li>
          <span> </span>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </div>
    </div>
  );
}

export default App;
