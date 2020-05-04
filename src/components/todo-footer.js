import React from "react";
import "./todo-footer.scss";

const TodoFooter = (props) => {
  const {
    todos,
    todoscount,
    clearComplected,
    footerActive,
    footerAll,
    footerComplected,
  } = props;
  const countleft = todoscount.length;
  const countcomplect = todos.length;
  const items = countleft > 1 ? "items" : "item";
  const clearcomplected =
    countcomplect - countleft > 0 ? "clear complected" : "";

  return (
    <div className="footer">
      <span className="todo-count">{`${countleft} ${items} left`}</span>
      <ul className="filters">
        <li>
          <a
            href="#/All"
            onClick={() => {
              footerAll();
            }}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/Active"
            onClick={() => {
              footerActive();
            }}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            onClick={() => {
              footerComplected();
            }}
          >
            Complected
          </a>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() => {
          clearComplected();
        }}
      >
        {`${clearcomplected}`}
      </button>
    </div>
  );
};

export default TodoFooter;
