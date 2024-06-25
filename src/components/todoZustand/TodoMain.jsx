import { useState } from 'react';
import useTodoStore from '../../stores/useTodoStore';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
 
uuidv4();

const TodoMain = () => {
  const [TextTodo, setTextTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const { todos, deleteMultipleTodos,addTodo, changeTodoType, removeTodo, editTodo} = useTodoStore();

  const handleAddTodo = () => {
    if (TextTodo.length === 0) {
      return;
    }
    addTodo(TextTodo);
    setTextTodo('');
    console.log(todos);
  };

  const handleEditTodo = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  
  const handleSaveEdit = (id) => {
    editTodo(id, editingText);
    setEditingId(null);
    setEditingText('');
  };
  const handleSelectTodo = (id) => {
    setSelectedTodos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((todoId) => todoId !== id)
        : [...prevSelected, id]
    );
  };

  const handleMultiDelete = () => {
    deleteMultipleTodos(selectedTodos);
    setSelectedTodos([]);
  };

  const handleFilter = (type) => {
    setFilter(type);
    
  };

  const handleTodoFilterChange = (id, type) => {
    changeTodoType(id, type);
    setFilter(filter);
    
    
  }
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    return todo.type === filter;
  });
  return (
    <div className="wrapper">
      <div className="todo-wrapper">
      {selectedTodos.length > 0 && (
          <button className="close-btn" onClick={handleMultiDelete}>X</button>
        )}
        <h1>Todo List</h1>
        <div className='todo-filter'>
          <p>Filters:</p>
          <select className="filter-todo" onChange={(e) => handleFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="done">Done</option>
            <option value="inprogress">Inprogress</option>
          </select>
        </div>
        <div className="todo-form">
          <input
            className="todo-input"
            placeholder="New Todo"
            type="text"
            value={TextTodo}
            onChange={(e) => setTextTodo(e.target.value)}
          />
          <button className="todo-button" onClick={handleAddTodo}>Add Todo</button>
        </div>

        {filteredTodos.map((todo) => (
          editingId === todo.id ? (
            <div key={todo.id} className="todo-form">
              <input
                className="todo-input"
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <div className="todo-edit-buttons">
              <button className="todo-button" onClick={() => handleSaveEdit(todo.id)}>Save</button>
              <button className="todo-button" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
              
            </div>
          ) : (
            <div key={todo.id} className="Todo">
              <input
                type="checkbox"
                checked={selectedTodos.includes(todo.id)}
                onChange={() => handleSelectTodo(todo.id)}
              />
             <p> {todo.taskname}</p>
           
            
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
                icon = {faPenToSquare}
                onClick = {() => handleEditTodo(todo.id, todo.taskname)}/>

                <FontAwesomeIcon 
                icon = {faTrash}
                onClick = {() => removeTodo(todo.id)}/>
              
               </div>
             
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default TodoMain;
