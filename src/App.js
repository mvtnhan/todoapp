// import axios from "axios";
import React from "react";
import styled from "styled-components";

import { STATUS } from "./constant";
import TodoFooter from "./components/todo-footer.js";
import TodoHeader from "./components/todo-header.js";
import TodoList from "./components/todo-list";

import "./scss/reset.scss";
import imgLoading from "./images/isLoading.gif";

class App extends React.Component {
  state = {
    todos: {
      1: {
        id: 1,
        content: "sell a keyboard",
        done: false,
      },
      2: {
        id: 2,
        content: "buy a mouse",
        done: false,
      },
      3: {
        id: 3,
        content: "play a new game",
        done: true,
      },
    },
    status: "ALL",
    isLoading: false,
    error: "",
  };

  addTodo = (todo) => {
    const id = Date.now();

    const newTodo = {
      [id]: {
        id,
        content: todo.content,
        done: false,
      },
    };
    this.setState({
      todos: Object.assign({}, this.state.todos, newTodo),
    });
  };

  toggleAll = () => {
    const y = Object.keys(this.state.todos).map(
      (item) => this.state.todos[item]
    );
    const counttoggle = y.filter((todo) => todo.done).length;

    // this.setState({
    //   todos: todos.map((todo) => ({
    //     ...todo,
    //     done: counttoggle !== todos.length,
    //   })),
    // });
  };

  toggleTodo = (id, content, done) => {
    const todoToggle = {
      id,
      content,
      done: !done,
    };

    this.setState({
      todos: Object.assign({}, this.state.todos, { [id]: todoToggle }),
    });
  };

  editTodo = ({ id, content, done }) => {
    const todoEdit = {
      id,
      content,
      done,
    };

    this.setState({
      todos: Object.assign({}, this.state.todos, { [id]: todoEdit }),
    });
  };

  deleteTodo = (id) => {
    delete this.state.todos[id];

    this.setState({
      todos: this.state.todos,
    });
  };

  clearCompleted = () => {
    const x = Object.keys(this.state.todos).map(
      (item) => this.state.todos[item]
    );
    const y = x.filter((todo) => todo.done !== true);
    console.log("y", y);
    this.setState({
      todos: this.state.todos,
    });
  };

  updateStatus = (status) => {
    this.setState({
      status: status,
    });
  };

  render() {
    const y = Object.keys(this.state.todos).map(
      (item) => this.state.todos[item]
    );

    const todoList = y.filter((todo) => {
      if (this.state.status === STATUS.ACTIVE) {
        return !todo.done;
      } else if (this.state.status === STATUS.COMPLETED) {
        return todo.done;
      }
      return true;
    });

    return (
      <Wrapper>
        <Title>Todos</Title>
        <TodoHeader
          todo={y}
          addTodo={this.addTodo}
          toggleAll={this.toggleAll}
        />
        {this.state.isLoading && <Loading src={imgLoading} alt="loading" />}
        <TodoList
          todos={y}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
          editTodo={this.editTodo}
        />
        <TodoFooter
          todos={todoList}
          updateStatus={this.updateStatus}
          clearCompleted={this.clearCompleted}
        />
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const Loading = styled.img`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
`;

const Title = styled.h1`
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  text-rendering: optimizeLegibility;
`;
