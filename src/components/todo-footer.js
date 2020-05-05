import React from "react";
import "./todo-footer.scss";

const TodoFooter = (props) => {
  const {
    todos,
    clearCompleted,
    footerActive,
    footerAll,
    footerCompleted,
  } = props;
  const unfinishedItemsCount = todos.filter((todo) => !todo.done).length;
  const itemText = unfinishedItemsCount > 1 ? "items" : "item";
  const haveCompletedItem = todos.length - unfinishedItemsCount > 0;

  return (
    <div className="footer">
      <span className="todo-count">{`${unfinishedItemsCount} ${itemText} left`}</span>
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
              footerCompleted();
            }}
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() => {
          clearCompleted();
        }}
      >
        {haveCompletedItem ? "clear completed" : ""}
      </button>
    </div>
  );
};

export default TodoFooter;
