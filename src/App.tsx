import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import Footer from './components/Footer';
import Header from './components/Header';
import TodoList from './components/TodoList';
import { URL } from './constant';
import imgLoading from './images/isLoading.gif';

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

const App = () => {
  const [state, setState] = useState<MyAppState>({
    todos: [],
    status: "ALL",
    isLoading: false,
    error: "",
  });

  const { isLoading } = useQuery("todos", async () => {
    const result = await axios.get(URL.TODOS);
    setState({ ...state, todos: result.data });
    return result.data;
  });

  const updateFilterStatus = ({ status }: Pick<MyAppState, "status">) => {
    setState({ ...state, status: status });
  };

  return (
    <Wrapper>
      <Title>Todos</Title>
      <Header todos={state.todos} />
      {isLoading && <Loading src={imgLoading} alt="loading" />}
      <TodoList todos={state.todos} status={state.status} />
      <Footer
        todos={state.todos}
        status={state.status}
        updateFilterStatus={updateFilterStatus}
      />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const Loading = styled.img`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
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
