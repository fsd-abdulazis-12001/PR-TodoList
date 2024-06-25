 
import React ,{ useState } from 'react'

const EditTodo = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task)
      
    const handlesubmit = (e) => {
        e.preventDefault()
        editTodo(value, task.id)
        setValue('')
    }


  return (
    <form className='todo-form' onSubmit={handlesubmit}>
        <input type='text' className='todo-input' value={value} placeholder='Edit' onChange={(e) => setValue(e.target.value)}/>
        <button type='submit' className='todo-button'>Edit Task</button>
    </form>
  )
}

export default EditTodo
