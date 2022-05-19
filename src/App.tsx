import React, { useState } from 'react';
import styled from 'styled-components';

import TodoFooter from './components/todo-footer';
import TodoHeader from './components/todo-header';
import TodoList from './components/todo-list';
import { STATUS } from './constant';
import imgLoading from './images/isLoading.gif';

export type Todo = {
  id: number;
  content: string;
  done: boolean;
};

export type MyAppState = {
  todos: { [key: number]: Todo };
  status: string;
  isLoading: boolean;
  error: string;
};

const App = () => {
  const [appState, setAppState] = useState<MyAppState>({
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
  });

  const addTodo = ({ content }: Pick<Todo, "content">) => {
    const id = Date.now();

    const newTodos = {
      [id]: {
        id,
        content: content,
        done: false,
      },
    };
    setAppState({
      ...appState,
      todos: Object.assign({}, appState.todos, newTodos),
    });
  };

  const toggleAll = () => {
    const { todos } = appState;
    const countDone = Object.keys(todos)
      .map((key) => todos[key as unknown as number])
      .filter((todo) => todo.done).length;

    const doneValue = Object.keys(todos).length !== countDone;

    const newTodos = (Object.keys(todos) as unknown as number[]).reduce(
      (acc, key) => {
        return Object.assign({}, acc, {
          [key]: { ...todos[key], done: doneValue },
        });
      },
      {}
    );

    setAppState({ ...appState, todos: newTodos });
  };

  const toggleTodo = ({ id, content, done }: Todo) => {
    const todoToggle = {
      id,
      content,
      done: !done,
    };

    setAppState({
      ...appState,
      todos: Object.assign({}, appState.todos, { [id]: todoToggle }),
    });
  };

  const editTodo = ({ id, content, done }: Todo) => {
    const todoEdit = {
      id,
      content,
      done,
    };

    setAppState({
      ...appState,
      todos: Object.assign({}, appState.todos, { [id]: todoEdit }),
    });
  };

  const deleteTodo = ({ id }: Pick<Todo, "id">) => {
    const { todos } = appState;
    const newTodos = Object.keys(todos).reduce((acc, key) => {
      if (key === id.toString()) return acc;
      return { ...acc, [key]: todos[key as unknown as number] };
      //return Object.assign({}, acc, { [key]: todos[key] });
    }, {});

    setAppState({ ...appState, todos: Object.assign({}, newTodos) });
  };

  const clearCompleted = () => {
    const newTodos = Object.keys(appState.todos).reduce((acc, key) => {
      return appState.todos[key as unknown as number].done
        ? acc
        : { ...acc, [key]: appState.todos[key as unknown as number] };
    }, {});
    setAppState({ ...appState, todos: newTodos });
  };

  const updateStatus = ({ status }: Pick<MyAppState, "status">) => {
    setAppState({ ...appState, status: status });
  };

  const newTodo = Object.keys(appState.todos).map(
    (item) => appState.todos[item as unknown as number]
  );
  const todoList = newTodo.filter((todo) => {
    if (appState.status === STATUS.ACTIVE) {
      return !todo.done;
    } else if (appState.status === STATUS.COMPLETED) {
      return todo.done;
    }
    return true;
  });

  return (
    <Wrapper>
      <Title>Todos</Title>
      <TodoHeader todo={newTodo} addTodo={addTodo} toggleAll={toggleAll} />
      {appState.isLoading && <Loading src={imgLoading} alt="loading" />}

      <TodoList
        todos={todoList}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />

      <TodoFooter
        todos={newTodo}
        updateStatus={updateStatus}
        clearCompleted={clearCompleted}
      />
    </Wrapper>
  );
};

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
