 
import { useNavigate } from 'react-router-dom'
import '../../App.css'  
const index = () => {
    const navigate = useNavigate()
  return (
    <div className='wrapper-btn'>
      <button className='todo-button' onClick={() => navigate('/TodoUstate')}>useState</button>
      <button className='todo-button' onClick={() => navigate('/pokemon')}>Pokemon List</button>
      <button className='todo-button' onClick={() => navigate('/TodoZustand')}>Zustand</button>
    </div>
  )
}

export default index
