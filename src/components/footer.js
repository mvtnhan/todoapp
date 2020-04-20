import React from "react";
import "../scss/footer.scss";

export default function Footer() {
  return (
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
  );
}
