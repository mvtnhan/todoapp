// import axios from "axios";
import React from "react";
import styled from "styled-components";

import { STATUS } from "./constant";
import TodoFooter from "./components/todo-footer";
import TodoHeader from "./components/todo-header";
import TodoList from "./components/todo-list";

import "./scss/reset.scss";
import imgLoading from "./images/isLoading.gif";

export type Todo = {
  id: number, 
  content: string, 
  done: boolean
}

export type MyState = {
  todos: {[key: number]: Todo},
  status: string,
  isLoading: boolean,
  error: string,
}

class App extends React.Component<{}, MyState> {
  state: MyState = {
    todos: {
      1591513897340: {
        id: 1591513897340,
        content: "sell a keyboard",
        done: false,
      },
      1591513897341: {
        id: 1591513897341,
        content: "buy a mouse",
        done: false,
      },
      1591513897343: {
        id: 1591513897343,
        content: "play a new game",
        done: true,
      },
    },
    status: "ALL",
    isLoading: false,
    error: "",
  };

  // adc(a : , b: )
  // vv({a, b}: )

// const x = {abc};

  addTodo = ( {content}: Pick<Todo, "content">) => {
    const id = Date.now();

    const newTodos = {
      [id]: {
        id,
        content: content,
        done: false,
      },
    };
    this.setState({
      todos: Object.assign({}, this.state.todos, newTodos),
    });
  };

  toggleAll = () => {
    const { todos } = this.state;
    const countDone = Object.keys(todos)
      .map((key) => todos[key as unknown as number])
      .filter((todo) => todo.done).length;

    const doneValue = Object.keys(todos).length !== countDone;

    const newTodos = (Object.keys(todos) as unknown as number[]).reduce((acc, key) => {
      return Object.assign({}, acc, {
        [key]: { ...todos[key], done: doneValue },
      });
    }, {});

    this.setState({
      todos: newTodos,
    });
  };

  toggleTodo = ({ id, content, done }: Todo) => {
    const todoToggle = {
      id,
      content,
      done: !done,
    };

    this.setState({
      todos: Object.assign({}, this.state.todos, { [id]: todoToggle }),
    });
  };

  editTodo = ({ id, content, done }: Todo) => {
    const todoEdit = {
      id,
      content,
      done,
    };

    this.setState({
      todos: Object.assign({}, this.state.todos, { [id]: todoEdit }),
    });
  };

  // const newTodos = Object.keys(todos)
  //   .map((key) => todos[key])
  //   .filter((todo) => todo.id !== id)
  //   .reduce((acc, item) => {
  //     return Object.assign({}, acc, { [item.id]: item });
  //   }, {});

  deleteTodo = ({ id }: Pick<Todo, "id">) => {
    const { todos } = this.state;
    const newTodos = Object.keys(todos).reduce((acc, key) => {
      if (key === id.toString()) return acc;
      return { ...acc, [key]: todos[key as unknown as number] };
      //return Object.assign({}, acc, { [key]: todos[key] });
    }, {});

    this.setState({
      todos: Object.assign({}, newTodos),
    });
  };

  clearCompleted = () => {
    const newTodos = Object.keys(this.state.todos).reduce((acc, key) => {
      return this.state.todos[key as unknown as number].done
        ? acc
        : { ...acc, [key]: this.state.todos[key as unknown as number] };
    }, {});
    this.setState({
      todos: newTodos,
    });
  };

  updateStatus = ({ status }: Pick<MyState, "status">) => {
    this.setState({
      status: status,
    });
  };

  render() {
    const newTodo = Object.keys(this.state.todos).map(
      (item) => this.state.todos[item as unknown as number]
    );
    const todoList = newTodo.filter((todo) => {
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
          todo={newTodo}
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
          todos={newTodo}
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
  top: -140px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  text-rendering: optimizeLegibility;
`;
