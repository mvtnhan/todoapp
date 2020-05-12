import React from "react";
import "./scss/reset.scss";
import "./App.scss";
import { STATUS } from "./constant";

import TodoHeader from "./components/todo-header.js";
import TodoFooter from "./components/todo-footer.js";
import TodoList from "./components/todo-list";

class App extends React.Component {
  todosKey = "todosKey";
  dataString = localStorage.getItem(this.todosKey);

  state = {
    todos: this.dataString != null ? JSON.parse(this.dataString) : [],
    status: "ALL",
  };

  addTodo = (todo) => {
    this.setState({
      todos: [
        ...this.state.todos,
        { ...todo, id: this.state.todos.length + 1 },
      ],
    });
  };

  toggleAll = () => {
    const { todos } = this.state;
    const counttoggle = todos.filter((todo) => todo.done).length;

    this.setState({
      todos: todos.map((todo) => ({
        ...todo,
        done: counttoggle !== todos.length,
      })),
    });
  };

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => ({
        ...todo,
        done: todo.id === id ? !todo.done : todo.done,
      })),
    });
  };

  editTodo = (content, id) => {
    this.setState({
      todos: this.state.todos.map((todo) => ({
        ...todo,
        content: todo.id === id ? content : todo.content,
      })),
    });
  };

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  updateStatus = (status) => {
    this.setState({
      status: status,
    });
  };

  clearCompleted = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.done !== true),
    });
  };

  render() {
    localStorage.setItem(this.todosKey, JSON.stringify(this.state.todos));
    let newtodos = this.state.todos;
    if (this.state.status === STATUS.ACTIVE) {
      newtodos = this.state.todos.filter((todo) => {
        return todo.done === false;
      });
    } else if (this.state.status === STATUS.COMPLETED) {
      newtodos = this.state.todos.filter((todo) => {
        return todo.done === true;
      });
    }

    return (
      <div className="todo">
        <h1 className="title">Todos</h1>
        <TodoHeader
          todo={this.state.todos}
          addTodo={this.addTodo}
          toggleAll={this.toggleAll}
        />
        <TodoList
          todos={newtodos}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
          editTodo={this.editTodo}
        />
        <TodoFooter
          todos={this.state.todos}
          updateStatus={this.updateStatus}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

export default App;
