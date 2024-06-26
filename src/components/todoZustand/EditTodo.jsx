import {useState} from 'react';
import useTodoStore from '../../stores/useTodoStore';

const EditTodo = ({ todo }) => {
  const [editingText, setEditingText] = useState(todo.taskname);
  const editTodo = useTodoStore((state) => state.editTodo);
  const setEditingId = useTodoStore((state) => state.setEditingId);

  const handleSaveEdit = (id) => {
    editTodo(id, editingText);
    setEditingId(null);
  };

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
