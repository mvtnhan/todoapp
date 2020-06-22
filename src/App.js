import { connect } from "react-redux";
import React from "react";
import styled from "styled-components";

import TodoFooter from "./components/todo-footer.js";
import TodoHeader from "./components/todo-header.js";
import TodoList from "./components/todo-list";

import "./scss/reset.scss";

class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <Title>Todos</Title>
        <TodoHeader />
        <TodoList />
        <TodoFooter />
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);

const Wrapper = styled.div`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  position: absolute;
  top: -140px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  text-rendering: optimizeLegibility;
`;
