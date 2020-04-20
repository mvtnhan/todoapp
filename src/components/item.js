import React from "react";
import "../scss/item.scss";

export default function Item() {
  return (
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
  );
}
