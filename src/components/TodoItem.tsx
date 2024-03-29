import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { Loading, Todo } from '../App';
import { URL } from '../constant';
import Checked from '../images/checkbox-todo-active.svg';
import Checkbox from '../images/checkbox-todo.svg';
import imgLoading from '../images/isLoading.gif';
import { TodoListProps } from './TodoList';

type TodoItemProps = {
  todo: Todo;
  onChange?: () => void;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo, onChange } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.content);

  const toggleQuery = useMutation(
    ({ id, content, done }: Todo) => {
      return axios.put(`${URL.TODOS}/${id}`, {
        content: content,
        done: !done,
      });
    },
    {
      onSuccess: () => {
        onChange && onChange();
      },
    }
  );

  const editQuery = useMutation(
    ({ id, content, done }: Todo) => {
      return axios.put(`${URL.TODOS}/${id}`, { content: content, done: done });
    },
    {
      onSuccess: () => {
        onChange && onChange();
      },
    }
  );

  const deleteQuery = useMutation(
    (id: Todo["id"]) => {
      return axios.delete(`${URL.TODOS}/${id}`);
    },
    {
      onSuccess: () => {
        onChange && onChange();
      },
    }
  );

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {editQuery.isLoading || deleteQuery.isLoading || toggleQuery.isLoading ? (
        <Loading src={imgLoading} alt="loading" />
      ) : editQuery.isError || deleteQuery.isError || toggleQuery.isError ? (
        `${editQuery.error} ${deleteQuery.error} ${toggleQuery.error}`
      ) : null}
      <Item key={todo.id}>
        <ToggleTodo
          type="checkbox"
          onChange={() => {
            toggleQuery.mutate(todo);
          }}
          checked={todo.done}
        />

        <TodoContent
          onDoubleClick={() => {
            if (!isEditing && !todo.done) {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? (
            <EditTodo
              type="edit"
              value={value}
              key={todo.id}
              onBlur={() => {
                setValue(todo.content);
                setIsEditing(false);
              }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  editQuery.mutate({
                    id: todo.id,
                    content: value,
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

        {!isEditing && (
          <DeletedBtn
            onClick={() => {
              deleteQuery.mutate(todo.id);
            }}
          />
        )}
      </Item>
    </>
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
