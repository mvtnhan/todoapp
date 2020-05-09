import React from "react";
import "./todo-item.scss";

class TodoItem extends React.Component {
  state = {
    editting: false,
  };

  showInput = () => {
    const showedit = !this.state.editting;
    this.setState({
      editting: showedit,
    });
  };

  render() {
    return (
      <div className="todo-item" key={this.props.todo.id}>
        <input
          className="toggle-todo-input"
          type="checkbox"
          onChange={() => {
            this.props.toggleTodo(this.props.todo.id);
          }}
          checked={this.props.todo.done}
        />
        {this.props.todo.done ? (
          <label
            className="todo-content ischecked"
            onDoubleClick={this.showInput}
          >
            {this.state.editting ? (
              <input
                className="edit-todo"
                type="edit"
                value={this.props.todo.content}
                key={this.props.todo.id}
                onBlur={this.showInput}
                onChange={(e) => {
                  this.props.editTodo(e.target.value, this.props.todo.id);
                }}
              />
            ) : (
              this.props.todo.content
            )}
          </label>
        ) : (
          <label className="todo-content" onDoubleClick={this.showInput}>
            {this.state.editting ? (
              <input
                className="edit-todo"
                type="edit"
                value={this.props.todo.content}
                key={this.props.todo.id}
                onBlur={this.showInput}
                onChange={(e) => {
                  this.props.editTodo(e.target.value, this.props.todo.id);
                }}
              />
            ) : (
              this.props.todo.content
            )}
          </label>
        )}

        {this.state.editting === false ? (
          <button
            className="delete-btn"
            onClick={() => {
              this.props.deleteTodo(this.props.todo.id);
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default TodoItem;
