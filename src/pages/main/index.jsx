import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css' 
const index = () => {
    const navigate = useNavigate()
  return (
    <div className='wrapper-btn'>
      <button className='todo-button' onClick={() => navigate('/TodoUstate')}>UState</button>

      <button className='todo-button'>Zustand</button>
    </div>
  )
}

export default index
