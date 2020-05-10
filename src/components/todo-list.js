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
