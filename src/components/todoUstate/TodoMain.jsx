import { useState } from 'react'
import TodoFrom from './TodoFrom'
import EditTodo from './EditTodo'
        
import TodoDone from './TodoDone'
import Todo from './Todo'
import {v4 as uuidv4} from 'uuid';
uuidv4();


const TodoMain = () => {

    const [todos, setTodus] = useState([])
    const [doneTodos, setDoneTodos] = useState([]);

    const addTodo = (todo) => {
        setTodus([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
    }

    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                const updatedTodo = { ...todo, completed: !todo.completed };
                if (updatedTodo.completed) {
                    setDoneTodos([...doneTodos, updatedTodo]);
                    return null;
                }
                return updatedTodo;
            }
            return todo;
        }).filter(todo => todo !== null);
        setTodus(updatedTodos);
    };
    const deleteTodo = (id) => {
        setTodus(todos.filter(todo => todo.id !== id))
    }
    const deleteDoneTodo = (id) => {
        setDoneTodos(doneTodos.filter(todo => todo.id !== id))
    }
    const deleteallDoneTodo = () => {
        setDoneTodos([])
    }
    
    const editTodo = (id) => {
        setTodus(todos.map(todo => todo.id === id ? {
            ...todo, isEditing: !todo.isEditing
        } : todo ))
    }

    const editTask = (task,id) => {
        setTodus(todos.map(todo => todo.id === id ? {
            ...todo,task, isEditing: !todo.isEditing
        } : todo ))
    }
  return (
    <div className='wrapper'>
      <div className='todo-wrapper'>
      <button className="close-btn" onClick={() =>  setTodus([])}>X</button>
      <h1>Todo List</h1>
      <TodoFrom addTodo={addTodo}/>
      {todos.map((todo,index) => (
        todo.isEditing ? (<EditTodo editTodo={editTask} task={todo} key={index}/>) :  
        (<Todo task={todo} key={index} 
            toggleComplete={toggleComplete} 
            deleteTodo={deleteTodo} 
            editTodo={editTodo}/>)
      ))}
    </div>
          <TodoDone doneTodos={doneTodos} deleteDoneTodo={deleteDoneTodo} deleteallDoneTodo= {deleteallDoneTodo} />
    </div>
  
    
  )
}

export default TodoMain
