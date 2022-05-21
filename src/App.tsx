import { useContext } from 'react';
import styled from 'styled-components';

import { AppContext, AppProvider } from './components/AppContext';
import Footer from './components/Footer';
import TodoHeader from './components/todo-header';
import TodoList from './components/todo-list';
import imgLoading from './images/isLoading.gif';

const App = () => {
  const appState = useContext(AppContext);
  return (
    <AppProvider>
      <Wrapper>
        <Title>Todos</Title>
        <TodoHeader />
        {appState?.state.isLoading && (
          <Loading src={imgLoading} alt="loading" />
        )}
        <TodoList />
        <Footer />
      </Wrapper>
    </AppProvider>
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
