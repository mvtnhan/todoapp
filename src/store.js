import { createStore } from "redux";

const initialState = {
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
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      const id = Date.now();
      const newTodos = {
        [id]: {
          id,
          content: action.content,
          done: action.done,
        },
      };
      return { ...state, todos: Object.assign({}, state.todos, newTodos) };

    case "TOGGLE_ALL":
      const countDone = Object.keys(state.todos)
        .map((key) => state.todos[key])
        .filter((todo) => todo.done).length;
      const doneValue = Object.keys(state.todos).length !== countDone;
      const newTodosToggleAll = Object.keys(state.todos).reduce((acc, key) => {
        return Object.assign({}, acc, {
          [key]: { ...state.todos[key], done: doneValue },
        });
      }, {});
      return { ...state, todos: newTodosToggleAll };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: Object.assign({}, state.todos, {
          [action.id]: {
            ...state.todos[action.id],
            done: !state.todos[action.id].done,
          },
        }),
      };

    case "DELETE_TODO":
      const newTodosDeleted = Object.keys(state.todos).reduce((acc, key) => {
        return key === action.id.toString()
          ? acc
          : { ...acc, [key]: state.todos[key] };
      }, {});
      return { ...state, todos: newTodosDeleted };

    case "EDIT_TODO":
      const newTodosEdit = Object.assign({}, state.todos, {
        [action.id]: {
          id: action.id,
          content: action.contentEdited,
          done: action.done,
        },
      });
      return { ...state, todos: newTodosEdit };

    case "CLEAR_COMPLETED":
      const newTodosCompleted = Object.keys(state.todos).reduce((acc, key) => {
        return state.todos[key].done === true
          ? acc
          : { ...acc, [key]: state.todos[key] };
      }, {});
      return { ...state, todos: newTodosCompleted };

    case "UPDATE_STATUS":
      return { ...state, status: action.status };

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
