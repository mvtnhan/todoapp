import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { URL } from '../constant';

export type Todo = {
  id: number;
  content: string;
  done: boolean;
};

export type MyAppState = {
  todos: Todo[];
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
    todos: [],
    status: "ALL",
    isLoading: false,
    error: "",
  });

  useEffect(() => {
    setState({ ...state, isLoading: true });

    axios
      .get(URL.TODOS)
      .then((response) => {
        setState((state.todos = response.data));
      })
      .catch((err) => {
        setState((state.error = err.data));
      })
      .finally(() => {
        setState({ ...state, isLoading: false });
      });
  }, []);

  console.log("state", state);
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
    const newTodos = {
      id: Date.now(),
      content: content,
      done: false,
    };
    axios.post(URL.TODOS, newTodos).then(() => {
      setState({ ...state, todos: state.todos.concat(newTodos) });
    });
  };

  const toggleAll = () => {
    const { todos } = state;
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

    setState({
      ...state,
      todos: todos.map((todo) => ({
        ...todo,
        done: willSetToTrue,
      })),
    });
  };

  const toggleTodo = ({ id, content, done }: Todo) => {
    axios
      .put(`${URL.TODOS}/${id}`, {
        content: content,
        done: !done,
      })
      .then(() => {
        setState({
          ...state,
          todos: state.todos.map((todo) => ({
            ...todo,
            done: todo.id === id ? !todo.done : todo.done,
          })),
        });
      });
  };

  const editTodo = ({ id, content, done }: Todo) => {
    axios
      .put(`${URL.TODOS}/${id}`, { content: content, done: done })
      .then(() => {
        setState({
          ...state,
          todos: state.todos.map((todo) => {
            return {
              ...todo,
              content: todo.id === id ? content : todo.content,
            };
          }),
        });
      });
  };

  const deleteTodo = (id: Todo["id"]) => {
    axios.delete(`${URL.TODOS}/${id}`).then(() => {
      setState({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      });
    });

    // const { todos } = state;
    // const newTodos = objectKeys(todos).reduce((acc, key) => {
    //   if (key === id) return acc;
    //   return { ...acc, [key]: todos[key] };
    // }, {});

    // setState({ ...state, todos: Object.assign({}, newTodos) });
  };

  const clearCompleted = () => {
    for (let index = 0; index < state.todos.length; index++) {
      const todo = state.todos[index];
      if (todo.done) {
        axios.delete(`${URL.TODOS}/${todo.id}`);
      }
    }
    setState({ ...state, todos: state.todos.filter((todo) => !todo.done) });
  };

  const updateFilterStatus = (status: MyAppState["status"]) => {
    setState({ ...state, status: status });
  };

  console.log("todos AppContext", state.todos);

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
