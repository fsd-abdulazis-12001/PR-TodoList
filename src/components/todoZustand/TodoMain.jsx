import useTodoStore from '../../stores/useTodoStore';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoMain = () => {

  const { selectedTodos, deleteMultipleTodos, setFilter } = useTodoStore();

  const handleDeleteMultiple = () => {
    deleteMultipleTodos(selectedTodos);
  };

  return (
    <div className="wrapper">
      <div className="todo-wrapper">
        {selectedTodos.length > 0 && (
          <button className="close-btn" onClick={handleDeleteMultiple}>X</button>
        )}
        <h1>Todo List</h1>
        <div className='todo-filter'>
          <p>Filters:</p>
          <select className="filter-todo" onChange={(e) => {setFilter(e.target.value)}}>
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="done">Done</option>
            <option value="inprogress">Inprogress</option>
          </select>
        </div>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default TodoMain;

