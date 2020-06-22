import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import { STATUS } from "../constant.js";
import TodoItem from "./todo-item.js";

const TodoList = (props) => {
  const todolist = Object.keys(props.todos)
    .map((item) => props.todos[item])
    .filter((todo) => {
      if (props.status === STATUS.ACTIVE) {
        return !todo.done;
      } else if (props.status === STATUS.COMPLETED) {
        return todo.done;
      }
      return true;
    });
  return (
    <div>
      {Object.keys(todolist).map((key) => {
        return (
          <TodoItem
            key={key}
            todo={todolist[key]}
            deleteTodo={(id) => {
              console.log("id", id);
              props.dispatch({
                type: "DELETE_TODO",
                id,
              });
            }}
            toggleTodo={(id) => {
              props.dispatch({
                type: "TOGGLE_TODO",
                id,
              });
            }}
            editTodo={(id, contentEdited, done) => {
              props.dispatch({
                type: "EDIT_TODO",
                id,
                contentEdited,
                done,
              });
            }}
          />
        );
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TodoList);

TodoList.prototype = {
  todos: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
