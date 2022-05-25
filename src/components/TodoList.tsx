import { AppState, Todo } from '../App';
import { STATUS } from '../constant';
import TodoItem from './TodoItem';

const TodoList = (props: AppState) => {
  const { todos, status } = props;
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
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </div>
  );
};

export default TodoList;
