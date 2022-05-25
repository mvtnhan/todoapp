import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { Loading, Todo } from '../App';
import { URL } from '../constant';
import imgLoading from '../images/isLoading.gif';

type HeaderProps = {
  todos: Todo[];
};

export default function Header(props: HeaderProps) {
  const [value, setvalue] = useState("");
  const { todos } = props;

  const {
    mutate: addTodo,
    isLoading: addTodoLoading,
    isError: addTodoIsError,
    error: addTodoError,
  } = useMutation((newTodo: Todo) => {
    return axios.post(URL.TODOS, newTodo);
  });

  const toggleAll = function useMutation() {
    const completedTodoNumber = todos.filter((todo) => todo.done).length;
    const willSetToTrue = completedTodoNumber !== todos.length;

    const todoTobeUpdated = todos.filter(
      (todo) => todo.done === !willSetToTrue
    );
    for (let index = 0; index < todoTobeUpdated.length; index++) {
      const todo = todoTobeUpdated[index];
      axios.put(`${URL.TODOS}/${todo.id}`, {
        content: todo.content,
        done: !todo.done,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      id: Date.now(),
      content: value,
      done: false,
    });
    setvalue("");
  };

  return (
    <Wrapper>
      {addTodoLoading ? (
        <Loading src={imgLoading} alt="loading" />
      ) : addTodoIsError ? (
        `${addTodoError}`
      ) : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        {!!Object.keys(todos).length && (
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
          value={value}
          onChange={(event) => {
            setvalue(event.target.value);
          }}
        />
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
