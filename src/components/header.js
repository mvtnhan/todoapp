import React from "react";
import "../scss/header.scss";

export default function Header() {
  return (
    <div className="header">
      <h1>Todos</h1>
      {/* <button className="btn-todo" /> */}
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
      />
    </div>
  );
}
