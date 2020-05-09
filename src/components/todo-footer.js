import React from "react";
import "./todo-footer.scss";

const TodoFooter = (props) => {
  const {
    todos,
    updateStatus,
    clearCompleted,
    // footerActive,
    // footerAll,
    // footerCompleted,
  } = props;
  const unfinishedItemsCount = todos.filter((todo) => !todo.done).length;
  const itemText = unfinishedItemsCount > 1 ? "items" : "item";
  const haveCompletedItem = todos.length - unfinishedItemsCount > 0;

  return (
    <div>
      {todos.length > 0 ? (
        <div className="footer">
          <span className="todo-count">{`${unfinishedItemsCount} ${itemText} left`}</span>
          <ul className="filters">
            <li>
              <a
                href="#/All"
                onClick={() => {
                  updateStatus("ALL");
                }}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/Active"
                onClick={() => {
                  updateStatus("ACTIVE");
                }}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/completed"
                onClick={() => {
                  updateStatus("COMPLETED");
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
      ) : null}
    </div>
  );
};

export default TodoFooter;
