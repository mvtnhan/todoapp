import React from "react";

import TodoItem from "./todo-item";
import { Todo } from "../App";

export type TodoListProps = {
  todos: Todo[], 
  deleteTodo: ({ id }: Pick<Todo, "id">) => void, 
  toggleTodo: (todo: Todo) => void, 
  editTodo: (todo: Todo) => void  
}

export interface TodoListProps1 {
  todos: Todo[], 
  deleteTodo: ({ id }: Pick<Todo, "id">) => void, 
  toggleTodo: (todo: Todo) => void, 
  editTodo: (todo: Todo) => void  
}

const TodoList = (props: TodoListProps) => {
  return (
    <div>
      {props.todos.map((todo) => {
        return ( 
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={props.deleteTodo}
            toggleTodo={props.toggleTodo}
            editTodo={props.editTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;