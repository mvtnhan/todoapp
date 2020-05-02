import React from "react";
import "./todo-footer.scss";

const TodoFooter = (props) => {
  const { todos, clearComplected } = props;
  const count = todos.length;
  const items = count > 1 ? "items" : "item";
  console.log(items);
  return (
    <div className="footer">
      <span className="todo-count">{`${count} ${items} left`}</span>
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
      <button
        className="clear-completed"
        onClick={() => {
          alert("hek");
        }}
      >
        Clear completed 1
      </button>
    </div>
  );
};

export default TodoFooter;
