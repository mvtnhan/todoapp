import React, { useState } from 'react';
import styled from 'styled-components';

import { Todo } from '../App';
import Checked from '../images/checkbox-todo-active.svg';
import Checkbox from '../images/checkbox-todo.svg';
import { TodoListProps } from './todo-list';

interface MyProps extends Omit<TodoListProps, "todos"> {
  todo: Todo;
}

type MyState = {
  editting: boolean;
  currenContent: string;
};

const TodoItem = (props: MyProps) => {
  const { todo, toggleTodo, editTodo, deleteTodo } = props;
  const [myState, setMyState] = useState<MyState>({
    editting: false,
    currenContent: props.todo.content,
  });

  const toggleEditing = () => {
    setMyState({ ...myState, editting: !myState.editting });
  };

  return (
    <Item key={todo.id}>
      <ToggleTodo
        type="checkbox"
        onChange={() => {
          toggleTodo({ id: todo.id, content: todo.content, done: todo.done });
        }}
        checked={todo.done}
      />

      <TodoContent
        onDoubleClick={() => {
          if (!myState.editting) {
            setMyState({ ...myState, editting: true });
          }
        }}
      >
        {myState.editting ? (
          <EditTodo
            type="edit"
            value={myState.currenContent}
            key={todo.id}
            onBlur={() => {
              setMyState({
                currenContent: todo.content,
                editting: false,
              });
            }}
            onChange={(e) => {
              setMyState({ ...myState, currenContent: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editTodo({
                  id: todo.id,
                  content: myState.currenContent,
                  done: todo.done,
                });
                toggleEditing();
              }
            }}
          />
        ) : (
          todo.content
        )}
      </TodoContent>

      {!myState.editting && (
        <DeletedBtn
          onClick={() => {
            deleteTodo({ id: todo.id });
          }}
        />
      )}
    </Item>
  );
};

export default TodoItem;

const DeletedBtn = styled.button`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;

  &:after {
    content: "×";
  }

  &:hover {
    color: red;
  }
`;
const Item = styled.div`
  position: relative;

  &:hover ${DeletedBtn} {
    display: block;
  }
`;

const TodoContent = styled.label`
  padding: 15px 15px 15px 60px;
  display: block;
  font-size: 24px;
  line-height: 1.2;
  transition: color 0.4s;
`;

const ToggleTodo = styled.input`
  text-align: center;
  width: 40px;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  appearance: none;
  opacity: 0;
  + ${TodoContent} {
    background-image: url(${Checkbox});
    background-repeat: no-repeat;
    background-position: center left;
  }

  &:checked + ${TodoContent} {
    background-image: url(${Checked});
    background-repeat: no-repeat;
    background-position: center left;
    color: #d9d9d9;
    text-decoration: line-through;
  }
`;

const EditTodo = styled.input`
  padding: 15px 15px 15px 15px;
  width: 100%;
  border: 1px solid #999;
  font-size: 24px;
  line-height: 1.2;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin: 0;
`;
