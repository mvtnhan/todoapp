import React from "react";
import "./todo-item.scss";

export default function Item() {
  return (
    <div className="todo-item">
      <input className="toggle-todo-input" type="checkbox"></input>
      <label className="todo-content">Todo one</label>
      <button className="delete-btn"></button>
    </div>
  );
}
