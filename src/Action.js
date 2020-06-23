export const ActionTypes = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_ALL: "TOGGLE_ALL",
  TOGGLE_TODO: "TOGGLE_TODO",
  DELETE_TODO: "DELETE_TODO",
  EDIT_TODO: "EDIT_TODO",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
  UPDATE_STATUS: "UPDATE_STATUS",
};

export function addTodo(content, done) {
  return {
    type: ActionTypes.ADD_TODO,
    content,
    done,
  };
}

export function toggleAll() {
  return {
    type: ActionTypes.TOGGLE_ALL,
  };
}

export function toggleTodo(id) {
  return {
    type: ActionTypes.TOGGLE_TODO,
    id,
  };
}

export function deleteTodo(id) {
  return {
    type: ActionTypes.DELETE_TODO,
    id,
  };
}

export function editTodo(id, contentEdited, done) {
  return {
    type: ActionTypes.EDIT_TODO,
    id,
    contentEdited,
    done,
  };
}

export function updateStatus(status) {
  return {
    type: ActionTypes.UPDATE_STATUS,
    status,
  };
}

export function clearCompleted() {
  return {
    type: ActionTypes.CLEAR_COMPLETED,
  };
}
