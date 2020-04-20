import React from "react";
import "../scss/footer.scss";

export default function Footer() {
  let num = 0;
  let items = "item";
  return (
    <div className="footer">
      <span className="todo-count">{`${num} ${items} left`}</span>
      <ul className="filters">
        <li>
          <a href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Complected</a>
        </li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </div>
  );
}
