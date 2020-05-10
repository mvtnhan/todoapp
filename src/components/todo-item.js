import React from "react";
import "./todo-item.scss";

class TodoItem extends React.Component {
  state = {
    editting: false,
  };

  showInput = () => {
    this.setState({
      editting: !this.state.editting,
    });
  };

  render() {
    const { todo, toggleTodo, editTodo, deleteTodo } = this.props;

    return (
      <div className="todo-item" key={todo.id}>
        <input
          className="toggle-todo-input"
          type="checkbox"
          onChange={() => {
            toggleTodo(todo.id);
          }}
          checked={todo.done}
        />

        <label className="todo-content" onDoubleClick={this.showInput}>
          {this.state.editting ? (
            <input
              className="edit-todo"
              type="edit"
              value={todo.content}
              key={todo.id}
              onBlur={this.showInput}
              onChange={(e) => {
                editTodo(e.target.value, todo.id);
              }}
            />
          ) : (
            todo.content
          )}
        </label>

        {!this.state.editting && (
          <button
            className="delete-btn"
            onClick={() => {
              deleteTodo(todo.id);
            }}
          />
        )}
      </div>
    );
  }
}

export default TodoItem;
