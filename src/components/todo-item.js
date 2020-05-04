import React from "react";
import "./todo-item.scss";

const TodoItem = (props) => {
  const { todo, deleteTodo, toggleTodo } = props;
  const checkedTodo = todo.done ? true : false;
  return (
    <div className="todo-item" key={todo.id}>
      <input
        className="toggle-todo-input"
        type="checkbox"
        onChange={() => {
          toggleTodo(todo.id);
        }}
        checked={checkedTodo}
      />
      <label className="todo-content">{todo.content}</label>
      <button
        className="delete-btn"
        onClick={() => {
          deleteTodo(todo.id);
        }}
      ></button>
    </div>
  );
};
export default TodoItem;
