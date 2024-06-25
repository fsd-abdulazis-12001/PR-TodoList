 
import TodoMainZustand from '../../components/todoZustand/TodoMain'
import { useNavigate } from 'react-router-dom';

function Index() {
 const navigate = useNavigate()
  return (
      <div>
      <h1>Zustand</h1>
      <div className='nav-btn-wrapper'>
      <button className='navigate-BTN' onClick={() => navigate('/')}>goto home</button>
      <button className='navigate-BTN' onClick={() => navigate('/detail')}>goto detail</button>
      </div>
  
      <div className='wrapper'>
    
      <TodoMainZustand/>
      
      </div>
      </div>
  )
}

export default Index;
