import React from 'react';

import { UseAppContext } from './AppContext';
import TodoItem from './todo-item';

const TodoList = () => {
  const { todoList } = UseAppContext();
  return (
    <div>
      {todoList.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </div>
  );
};

export default TodoList;
