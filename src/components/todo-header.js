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

  toggleAll = () => {
    alert("có gì hot ko");
  };

  render() {
    return (
      <div className="header">
        <form onSubmit={this.handleSubmit}>
          <input
            className="toggle-all"
            type="checkbox"
            onClick={this.toggleAll}
          ></input>
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
