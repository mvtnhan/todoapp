import React from "react";
import "./todo-header.scss";

class TodoHeader extends React.Component {
  state = {
    content: "",
    done: false,
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state);
    this.setState({
      content: "",
    });
  };

  render() {
    const countToggle = this.props.todo.filter((todo) => todo.done).length;
    const countTodo = this.props.todo.length;

    return (
      <div className="header">
        <form onSubmit={this.handleSubmit}>
          {countTodo > 0 ? (
            countToggle === countTodo ? (
              <input
                className="toggle-all"
                type="checkbox"
                onChange={this.props.toggleAll}
                checked={countToggle === countTodo}
              />
            ) : (
              <input
                className="toggle-all"
                type="checkbox"
                onChange={this.props.toggleAll}
              />
            )
          ) : null}
          <input
            className="new-todo-input"
            type="text"
            placeholder="What needs to be done?"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default TodoHeader;
