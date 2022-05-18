import React, { useState } from 'react';
import styled from 'styled-components';

import { Todo } from '../App';

type MyProps = {
  todo: Todo[];
  addTodo: ({ content }: Pick<Todo, "content">) => void;
  toggleAll: () => void;
};

type MyState = {
  content: string;
  done: boolean;
};

const TodoHeader = (props: MyProps) => {
  const { todo, addTodo, toggleAll } = props;
  const [myState, setMyState] = useState<MyState>({
    content: "",
    done: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo({
      content: myState.content,
      // done: this.state.done,
    });
    setMyState({
      content: "",
      done: false,
    });
  };

  return (
    <Header>
      <form onSubmit={(e) => handleSubmit(e)}>
        {!!todo.length && (
          <ToggleAll
            type="checkbox"
            onChange={() => {
              toggleAll();
            }}
          />
        )}

        <InputNewTodo
          type="text"
          placeholder="What needs to be done?"
          value={myState.content}
          onChange={(event) => {
            setMyState({ content: event.target.value, done: false });
          }}
        />
      </form>
    </Header>
  );
};

export default TodoHeader;

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
