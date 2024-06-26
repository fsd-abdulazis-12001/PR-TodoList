import {useState, useEffect} from 'react';
import useTodoStore from '../../stores/useTodoStore';

const EditTodo = () => {
   
  const editTodo = useTodoStore((state) => state.editTodo);
  const setEditingId = useTodoStore((state) => state.setEditingId);
  const editingId = useTodoStore((state) => state.editingId);
  const todos = useTodoStore((state) => state.todos);

  const todo = todos.find((todo) => todo.id === editingId);

  const [editingText, setEditingText] = useState(todo ? todo.taskname : '');

  useEffect(() => {
    if (todo) {
      setEditingText(todo.taskname);
    }
  }, [todo]);

  const handleSaveEdit = () => {
    if (todo) {
      editTodo(todo.id, editingText);
      setEditingId(null);
    }
  };

  if (!todo) {
    return null; 
  }

  return (
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
  );
};

export default EditTodo;
