import React from "react";
import "../scss/header.scss";

export default function Header() {
  return (
    <div className="header">
      <h1 className="title">Todos</h1>
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
      />
    </div>
  );
}
