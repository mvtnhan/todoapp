import { AppState, Todo } from '../App';
import { STATUS } from '../constant';
import TodoItem from './TodoItem';

export type TodoListProps = AppState & {
  onChange?: () => void;
};

const TodoList = (props: TodoListProps) => {
  const { todos, status, onChange } = props;
  const todoList = todos.filter((todo) => {
    if (status === STATUS.ACTIVE) {
      return !todo.done;
    } else if (status === STATUS.COMPLETED) {
      return todo.done;
    }
    return true;
  });

  return (
    <div>
      {todoList.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} onChange={onChange} />;
      })}
    </div>
  );
};

export default TodoList;
