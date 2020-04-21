import React from "react";
import "./todo-header.scss";

export default function Header() {
  return (
    <div className="header">
      <input className="toggle-all" type="checkbox" />
      <input
        className="new-todo-input"
        type="text"
        placeholder="What needs to be done?"
      />
    </div>
  );
}
