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
    // if (counttoggle === todos.length) {
    //   this.setState({
    //     todos: todos.map((todo) => ({
    //       ...todo,
    //       done: false,
    //     })),
    //   });
    // } else {
    //   this.setState({
    //     todos: todos.map((todo) => ({
    //       ...todo,
    //       done: true,
    //     })),
    //   });
    // }
    this.setState({
      todos: todos.map((todo) => ({
        ...todo,
        done: counttoggle !== todos.length,
      })),
    });
  };

  toggleTodo = (id) => {
    //const todos = this.state.todos.map((todo) => {
    //   if (todo.id === id) {
    //     return {
    //       ...todo,
    //       done: !todo.done ,
    //     };
    //   }
    //   return todo;
    // });
    this.setState({
      todos: this.state.todos.map((todo) => ({
        ...todo,
        done: todo.id === id ? !todo.done : todo.done,
      })),
    });
  };

  editTodo = (content, id) => {
    // const todos = this.state.todos.map((todo) => {
    //   if (todo.id === id) {
    //     return {
    //       ...todo,
    //       content: content,
    //     };
    //   }
    //   return todo;
    // });
    this.setState({
      todos: this.state.todos.map((todo) => ({
        ...todo,
        content: todo.id === id ? content : todo.content,
      })),
    });
  };
  // const counttoggle = todos.filter((todo) => todo.done).length;

  deleteTodo = (id) => {
    // const todos = this.state.todos.filter((todo) => {
    //   return todo.id !== id;
    // });
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  updateStatus = (status) => {
    this.setState({
      status: status,
    });
  };

  // footerAll = () => {
  //   this.setState({
  //     status: "ALL",
  //   });
  // };

  // footerActive = () => {
  //   this.setState({
  //     status: "ACTIVE",
  //   });
  // };

  // footerCompleted = () => {
  //   this.setState({
  //     status: "COMPLETED",
  //   });
  // };

  clearCompleted = () => {
    // const todos = this.state.todos.filter((todo) => {
    //   return todo.done !== true;
    // });
    this.setState({
      todos: this.state.todos.filter((todo) => todo.done !== true),
    });
  };

  render() {
    let newtodos = this.state.todos;
    if (this.state.status === "ACTIVE") {
      newtodos = this.state.todos.filter((todo) => {
        return todo.done === false;
      });
    } else if (this.state.status === "COMPLETED") {
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
          // footerAll={this.footerAll}
          // footerActive={this.footerActive}
          // footerCompleted={this.footerCompleted}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

export default App;
