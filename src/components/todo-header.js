import { connect } from "react-redux";
import React from "react";
import styled from "styled-components";
import * as Action from "../Action.js";

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

    this.props.addTodo(this.state.content, this.state.done);

    this.setState({
      content: "",
    });
  };

  render() {
    return (
      <Header>
        <form onSubmit={this.handleSubmit}>
          {!!Object.keys(this.props.todos).length && (
            <ToggleAll type="checkbox" onChange={this.props.toggleAll} />
          )}

          <InputNewTodo
            type="text"
            placeholder="What needs to be done?"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </form>
      </Header>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleAll: () => dispatch(Action.toggleAll()),

    addTodo: (content, done) => dispatch(Action.addTodo(content, done)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoHeader);

const Header = styled.div`
  input[type="checkbox"] {
    outline: none;
  }
`;

const ToggleAll = styled.input`
  position: absolute;
  top: 8px;
  left: -18px;
  width: 70px;
  height: 40px;
  text-align: center;
  border: none;
  transform: rotate(90deg);
  appearance: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset -3px 0px rgba(155, 126, 126, 0.03);

  &:before {
    content: "\\276F";
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }

  &:hover::before {
    color: black;
    cursor: pointer;
  }
`;

const InputNewTodo = styled.input`
  position: relative;
  margin: 0 0 0 40px;
  width: 93%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  box-sizing: border-box;
  padding: 16px 16px 16px 20px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -3px rgba(155, 126, 126, 0.03);

  &::placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;
