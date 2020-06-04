import PropTypes from "prop-types";
import React from "react";

import TodoItem from "./todo-item.js";

const TodoList = (props) => {
  return (
    <div>
      {props.todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={props.deleteTodo}
            toggleTodo={props.toggleTodo}
            editTodo={props.editTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;

TodoList.prototype = {
  todos: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
