import  { useState } from 'react';
import useTodoStore from '../../stores/useTodoStore';

const TodoForm = () => {
  const [TextTodo, setTextTodo] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAddTodo = () => {
    if (TextTodo.length === 0) {
      return;
    }
    addTodo(TextTodo);
    setTextTodo('');
  };

  return (
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
  );
};

export default TodoForm;
