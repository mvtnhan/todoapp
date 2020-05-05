import React from "react";
import TodoItem from "./todo-item.js";

const TodoList = (props) => {
  const { todos, deleteTodo, toggleTodo, editTodo } = props;
  return (
    <div>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            //{...props}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
