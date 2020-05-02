import React from "react";
import "./todo-item.scss";

const TodoItem = (props) => {
  const { todo, deleteTodo, toggleTodo } = props;
  return (
    <div className="todo-item" key={todo.id}>
      <input
        className="toggle-todo-input"
        type="checkbox"
        onChange={() => {
          toggleTodo(todo.id);
        }}
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
// const TodoItem = ({ todos, deleteTodo, toggleTodo }) => {
//   const todoitem = todos.length ? (
//     todos.map((todo) => {
//       return (
//         <div className="todo-item" key={todo.id}>
//           <input
//             className="toggle-todo-input"
//             type="checkbox"
//             onChange={() => {
//               toggleTodo(todo.id);
//             }}
//           />
//           <label className="todo-content">{todo.content}</label>
//           <button
//             className="delete-btn"
//             onClick={() => {
//               deleteTodo(todo.id);
//             }}
//           ></button>
//         </div>
//       );
//     })
//   ) : (
//     <div className="content-none" />
//   );
//   return <div>{todoitem}</div>;
// };

// export default TodoItem;
