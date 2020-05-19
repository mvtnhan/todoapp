import React from "react";
import styled from "styled-components";
import axios from "axios";

import TodoHeader from "./components/todo-header.js";
import TodoFooter from "./components/todo-footer.js";
import TodoList from "./components/todo-list";
import { STATUS, URL } from "./constant";
import imgLoading from "./images/isLoading.gif";

import "./scss/reset.scss";

class App extends React.Component {
  state = {
    todos: [],
    status: "ALL",
    isLoading: false,
    error: "",
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    axios
      .get(URL.TODOS)
      .then((response) => {
        this.setState({
          todos: response.data,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.data,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      content: todo.content,
      done: false,
    };
    axios.post(URL.TODOS, newTodo).then(() => {
      this.setState({
        todos: this.state.todos.concat(newTodo),
      });
    });
  };

  toggleAll = () => {
    const { todos } = this.state;
    const completedTodoNumber = todos.filter((todo) => todo.done).length;
    const willSetToTrue = completedTodoNumber !== todos.length;

    const todoTobeUpdated = todos.filter(
      (todo) => todo.done === !willSetToTrue
    );

    for (let index = 0; index < todoTobeUpdated.length; index++) {
      const todo = todoTobeUpdated[index];
      axios.put(`${URL.TODOS}/${todo.id}`, {
        content: todo.content,
        done: !todo.done,
      });
    }

    this.setState({
      todos: todos.map((todo) => ({
        ...todo,
        done: willSetToTrue,
      })),
    });
  };

  toggleTodo = (todo, id) => {
    axios
      .put(`${URL.TODOS}/${id}`, {
        content: todo.content,
        done: !todo.done,
      })
      .then(() => {
        this.setState({
          todos: this.state.todos.map((todo) => ({
            ...todo,
            done: todo.id === id ? !todo.done : todo.done,
          })),
        });
      });
  };

  editTodo = (id, todo, content) => {
    axios
      .put(`${URL.TODOS}/${id}`, {
        content: content,
        done: todo.done,
      })
      .then(() => {
        this.setState({
          todos: this.state.todos.map((todo) => ({
            ...todo,

            content: todo.id === id ? content : todo.content,
          })),
        });
      });
  };

  deleteTodo = (id) => {
    axios.delete(`${URL.TODOS}/${id}`).then(() => {
      this.setState({
        todos: this.state.todos.filter((todo) => todo.id !== id),
      });
    });
  };

  updateStatus = (status) => {
    this.setState({
      status: status,
    });
  };

  clearCompleted = () => {
    for (let index = 0; index < this.state.todos.length; index++) {
      const todo = this.state.todos[index];
      if (todo.done) {
        axios.delete(`${URL.TODOS}/${todo.id}`);
      }
    }
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.done),
    });
  };

  render() {
    const todoList = this.state.todos.filter((todo) => {
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
          todo={this.state.todos}
          addTodo={this.addTodo}
          toggleAll={this.toggleAll}
        />
        {this.state.isLoading && <Loading src={imgLoading} alt="loading" />}
        <TodoList
          todos={todoList}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
          editTodo={this.editTodo}
        />
        <TodoFooter
          todos={this.state.todos}
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
