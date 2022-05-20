import React, { useState } from 'react';

import { STATUS } from '../constant';

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
  undefined
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

    setState({ ...state, todos: newTodos });
  };

  const toggleTodo = ({ id, content, done }: Todo) => {
    const todoToggle = {
      id,
      content,
      done: !done,
    };

    setState({
      ...state,
      todos: Object.assign({}, state.todos, { [id]: todoToggle }),
    });
  };

  const editTodo = ({ id, content, done }: Todo) => {
    const todoEdit = {
      id,
      content,
      done,
    };

    setState({
      ...state,
      todos: Object.assign({}, state.todos, { [id]: todoEdit }),
    });
  };

  const deleteTodo = ({ id }: Pick<Todo, "id">) => {
    const { todos } = state;
    const newTodos = Object.keys(todos).reduce((acc, key) => {
      if (key === id.toString()) return acc;
      return { ...acc, [key]: todos[key as unknown as number] };
      //return Object.assign({}, acc, { [key]: todos[key] });
    }, {});

    setState({ ...state, todos: Object.assign({}, newTodos) });
  };

  const clearCompleted = () => {
    const newTodos = Object.keys(state.todos).reduce((acc, key) => {
      return state.todos[key as unknown as number].done
        ? acc
        : { ...acc, [key]: state.todos[key as unknown as number] };
    }, {});
    setState({ ...state, todos: newTodos });
  };

  const updateStatus = ({ status }: Pick<MyAppState, "status">) => {
    setState({ ...state, status: status });
  };

  const newTodo = Object.keys(state.todos).map(
    (key) => state.todos[key as unknown as number]
  );
  const todoList = newTodo.filter((todo) => {
    if (state.status === STATUS.ACTIVE) {
      return !todo.done;
    } else if (state.status === STATUS.COMPLETED) {
      return todo.done;
    }
    return true;
  });

  return {
    addTodo,
    toggleAll,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    updateStatus,
    todoList,
    todoNew: newTodo,
  };
};
