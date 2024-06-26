import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditTodo from './EditTodo';
import useTodoStore from '../../stores/useTodoStore';

const TodoList = () => {
    
  const { selectedTodos, editingId, setEditingId, removeTodo, handleSelectTodo, handleTodoFilterChange, filteredTodos } = useTodoStore();

  return (
    <>
      {filteredTodos().map((todo) => (
        editingId === todo.id ? (
          <EditTodo key={todo.id} todo={todo} />
        ) : (
          <div key={todo.id} className="Todo">
            <input
              type="checkbox"
              checked={selectedTodos.includes(todo.id)}
              onChange={() => handleSelectTodo(todo.id)}
            />
            <p>{todo.taskname}</p>
            <div className='Todo-icons'>
              <select
                value={todo.type}
                onChange={(e) => handleTodoFilterChange(todo.id, e.target.value)}
              >
                <option value="todo">Todo</option>
                <option value="done">Done</option>
                <option value="inprogress">Inprogress</option>
              </select>
              <FontAwesomeIcon 
                icon={faPenToSquare}
                onClick={() => setEditingId(todo.id)}
              />
              <FontAwesomeIcon 
                icon={faTrash}
                onClick={() => removeTodo(todo.id)}
              />
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default TodoList;
