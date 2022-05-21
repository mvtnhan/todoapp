import { STATUS } from '../constant';
import { objectKeys } from '../util';
import { UseAppContext } from './AppContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, status } = UseAppContext();

  const filteredKeys = objectKeys(todos).filter((key) => {
    const todo = todos[key];

    if (status === STATUS.ACTIVE) {
      return !todo.done;
    } else if (status === STATUS.COMPLETED) {
      return todo.done;
    }

    return true;
  });

  return (
    <div>
      {filteredKeys.map((key) => {
        return <TodoItem key={todos[key].id} todo={todos[key]} />;
      })}
    </div>
  );
};

export default TodoList;
