import React from "react";
import "./scss/reset.scss";
import "./App.scss";

import TodoHeader from "./components/todo-header.js";
import TodoFooter from "./components/todo-footer.js";
import TodoList from "./components/todo-list";

class App extends React.Component {
  state = {
    todos: [],
    status: "ALL",
  };

  addTodo = (todo) => {
    todo.id = this.state.todos.length + 1;
    let todos = [...this.state.todos, todo];
    this.setState({
      todos,
    });
  };

  toggleTodo = (id) => {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });
    this.setState({
      todos,
    });
  };

  editTodo = (content, id) => {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          content: content,
        };
      }
      return todo;
    });
    this.setState({
      todos,
    });
  };

  deleteTodo = (id) => {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos,
    });
  };

  footerAll = () => {
    this.setState({
      status: "ALL",
    });
  };

  footerActive = () => {
    this.setState({
      status: "ACTIVE",
    });
  };

  footerComplected = () => {
    this.setState({
      status: "COMPLECTED",
    });
  };

  clearComplected = () => {
    const todos = this.state.todos.filter((todo) => {
      return todo.done !== true;
    });
    this.setState({
      todos,
    });
  };

  render() {
    let newtodos = this.state.todos;
    if (this.state.status === "ACTIVE") {
      newtodos = this.state.todos.filter((todo) => {
        return todo.done === false;
      });
    } else if (this.state.status === "COMPLECTED") {
      newtodos = this.state.todos.filter((todo) => {
        return todo.done === true;
      });
    }
    return (
      <div className="todo">
        <h1 className="title">Todos</h1>
        <TodoHeader addTodo={this.addTodo} />
        <TodoList
          todos={newtodos}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
          editTodo={this.editTodo}
        />
        <TodoFooter
          todos={this.state.todos}
          footerAll={this.footerAll}
          footerActive={this.footerActive}
          footerCompleted={this.footerComplected}
          clearCompleted={this.clearComplected}
        />
      </div>
    );
  }
}

export default App;
