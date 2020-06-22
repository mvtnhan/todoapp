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
      const newtodosadd = {
        [id]: {
          id,
          content: action.content,
          done: action.done,
        },
      };
      return { ...state, todos: Object.assign({}, state.todos, newtodosadd) };

    case "TOGGLE_ALL":
      const countDone = Object.keys(state.todos)
        .map((key) => state.todos[key])
        .filter((todo) => todo.done).length;
      const doneValue = Object.keys(state.todos).length !== countDone;
      const newtodostoggleall = Object.keys(state.todos).reduce((acc, key) => {
        return Object.assign({}, acc, {
          [key]: { ...state.todos[key], done: doneValue },
        });
      }, {});
      console.log("newtodostoggleall", newtodostoggleall);
      return { ...state, todos: newtodostoggleall };

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
      const newtodos = Object.keys(state.todos).reduce((acc, key) => {
        if (key === action.id.toString()) return acc;

        return { ...acc, [key]: state.todos[key] };
      }, {});
      return { ...state, todos: newtodos };

    case "EDIT_TODO":
      const newtodosedit = Object.assign({}, state.todos, {
        [action.id]: {
          id: action.id,
          content: action.contentEdited,
          done: action.done,
        },
      });
      return { ...state, todos: newtodosedit };

    case "CLEAR_COMPLETED":
      const clearArray = Object.keys(state.todos).reduce(() => {
        return Object.assign(
          [],
          Object.keys(state.todos)
            .map((key) => state.todos[key])
            .filter((todo) => !todo.done)
        );
      });

      const newtodoscompleted = clearArray.reduce((acc, key) => {
        return { ...acc, [key.id]: key };
      }, {});
      return { ...state, todos: newtodoscompleted };

    case "UPDATE_STATUS":
      console.log("action.status", action.status);
      return { ...state, status: action.status };

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
