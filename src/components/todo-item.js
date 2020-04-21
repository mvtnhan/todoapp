import React from "react";
import "./todo-item.scss";

export default function Item() {
  return (
    <div className="todo-item">
      <input className="toggle-todo" type="checkbox"></input>
      <label className="content-todo">Todo one</label>
      <button className="delete-btn"></button>
    </div>
  );
}
