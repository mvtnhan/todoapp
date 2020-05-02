import React from "react";
import "./scss/reset.scss";
import "./App.scss";

import TodoHeader from "./components/todo-header.js";
import TodoFooter from "./components/todo-footer.js";
import TodoList from "./components/todo-list";

class App extends React.Component {
  state = {
    todos: [
      { content: "one", done: false, id: 1 },
      { content: "true", done: false, id: 2 },
      { content: "three", done: false, id: 3 },
    ],
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

  deleteTodo = (id) => {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos,
    });
  };

  clearComplected = () => {
    console.log("aas");
  };

  render() {
    return (
      <div className="todo">
        <h1 className="title">Todos</h1>
        <button className="clear-completed" onClick={() => {}}>
          Clear completed 1
        </button>
        {/* <TodoHeader addTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
        /> */}

        <TodoFooter
          todos={this.state.todos}

          // clearComplected={this.clearComplected}
        />
      </div>
    );
  }
}

export default App;
{
  /* {this.state.todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              deleteTodo={this.deleteTodo}
              toggleTodo={this.toggleTodo}
            />
          );
        })} */
}

// const todoitem = this.state.todos.length
//   ? this.state.todos.map((todo) => {
//       return (
//         <TodoItem
//           todo={todo}
//           deleteTodo={this.deleteTodo}
//           toggleTodo={this.toggleTodo}
//         />
//       );
//     })
//   : null;

// const todos = this.state.todos.filter((todo) => {
//   return todo.done !== true;
// });
// this.setState({
//   todos,
// });
