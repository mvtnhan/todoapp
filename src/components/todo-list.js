import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import * as Action from "../Action.js";

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
              props.deleteTodo(id);
            }}
            toggleTodo={(id) => {
              props.toggleTodo(id);
            }}
            editTodo={(id, contentEdited, done) => {
              props.editTodo(id, contentEdited, done);
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

function mapDispatchToProps(dispatch) {
  return {
    deleteTodo: (id) => dispatch(Action.deleteTodo(id)),
    toggleTodo: (id) => dispatch(Action.toggleTodo(id)),
    editTodo: (id, contentEdited, done) =>
      dispatch(Action.editTodo(id, contentEdited, done)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

TodoList.prototype = {
  todos: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
