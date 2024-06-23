 
import { useState } from 'react'

const TodoFrom = ({addTodo}) => {
    const [value, setValue] = useState('')

    const handlesubmit = (e) => {
        e.preventDefault()
        if (value.trim() !== '') {
            addTodo(value)
            setValue('')
        }
       
    }


  return (
    <form className='todo-form' onSubmit={handlesubmit}>
        <input type='text' className='todo-input' value={value} placeholder='Ngapain ya hari ini?' onChange={(e) => setValue(e.target.value)}/>
        <button type='submit' className='todo-button'>Add Todo</button>
    </form>
  )
}

export default TodoFrom
