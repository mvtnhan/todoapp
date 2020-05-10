import React from "react";
import "./todo-footer.scss";
import { STATUS } from "../constant";
import { capitalize } from "../util";

const TodoFooter = (props) => {
  const { todos, updateStatus, clearCompleted } = props;
  const unfinishedItemsCount = todos.filter((todo) => !todo.done).length;
  const itemText = unfinishedItemsCount > 1 ? "items" : "item";
  const haveCompletedItem = todos.length - unfinishedItemsCount > 0;

  return (
    <div>
      {todos.length > 0 ? (
        <div className="footer">
          <span className="todo-count">{`${unfinishedItemsCount} ${itemText} left`}</span>
          <ul className="filters">
            {Object.keys(STATUS).map((statusKey) => {
              return (
                <li key={statusKey}>
                  <a
                    href="#/"
                    onClick={() => {
                      updateStatus(STATUS[statusKey]);
                    }}
                  >
                    {capitalize(STATUS[statusKey])}
                  </a>
                </li>
              );
            })}
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
