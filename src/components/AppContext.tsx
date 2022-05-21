import React, { useState } from 'react';

import { objectKeys } from '../util';

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

type AppContextValue = {
  state: MyAppState;
  setState: React.Dispatch<React.SetStateAction<MyAppState>>;
};

export const AppContext = React.createContext<AppContextValue | undefined>(
  undefined,
);

export const AppProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [state, setState] = useState<MyAppState>({
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

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => {
  const { state, setState } = React.useContext(AppContext) || {};

  if (!state || !setState) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  const addTodo = ({ content }: Pick<Todo, "content">) => {
    const id = Date.now();

    const newTodos = {
      [id]: {
        id,
        content: content,
        done: false,
      },
    };
    setState({
      ...state,
      todos: Object.assign({}, state.todos, newTodos),
    });
  };

  const toggleAll = () => {
    const { todos } = state;
    const countDone = objectKeys(todos)
      .map(key => todos[key])
      .filter(todo => todo.done).length;

    const doneValue = Object.keys(todos).length !== countDone;

    const newTodos = objectKeys(todos).reduce((acc, key) => {
      return Object.assign({}, acc, {
        [key]: { ...todos[key], done: doneValue },
      });
    }, {});

    setState({ ...state, todos: newTodos });
  };

  const toggleTodo = (id: Todo["id"]) => {
    setState({
      ...state,
      todos: {
        ...state.todos,
        [id]: { ...state.todos[id], done: !state.todos[id].done },
      },
    });
  };

  const editTodo = ({ id, content }: Todo) => {
    setState({
      ...state,
      todos: { ...state.todos, [id]: { ...state.todos[id], content } },
    });
  };

  const deleteTodo = (id: Todo["id"]) => {
    const { todos } = state;
    const newTodos = objectKeys(todos).reduce((acc, key) => {
      if (key === id) return acc;
      return { ...acc, [key]: todos[key] };
    }, {});

    setState({ ...state, todos: Object.assign({}, newTodos) });
  };

  const clearCompleted = () => {
    const newTodos = objectKeys(state.todos).reduce((acc, key) => {
      return state.todos[key].done ? acc : { ...acc, [key]: state.todos[key] };
    }, {});
    setState({ ...state, todos: newTodos });
  };

  const updateFilterStatus = (status: MyAppState["status"]) => {
    setState({ ...state, status: status });
  };

  return {
    todos: state.todos,
    status: state.status,
    addTodo,
    toggleAll,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    updateFilterStatus,
  };
};
