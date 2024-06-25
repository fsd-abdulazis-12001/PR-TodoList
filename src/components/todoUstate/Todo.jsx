import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
 

const Todo = ({task,toggleComplete, deleteTodo,editTodo}) => {
  return (
    <div className='Todo'>
      <p className={task.completed ? 'completed' : ''}>{task.task} </p>
      <div className='Todo-icons'>

        <FontAwesomeIcon 
          icon = {faPenToSquare}
          onClick = {() => editTodo(task.id)}/>
        <FontAwesomeIcon 
          icon = {faTrash}
          onClick = {() => deleteTodo(task.id)}/>
        <FontAwesomeIcon 
          icon={faCheckSquare} 
          onClick={() => toggleComplete(task.id)} 
          className={task.completed ? 'completed' : ''}
        />
      </div>
    </div>
  )
}

export default Todo
