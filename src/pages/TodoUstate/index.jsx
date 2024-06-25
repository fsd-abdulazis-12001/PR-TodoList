import TodoMain from '../../components/todoUstate/TodoMain'
import { useNavigate } from 'react-router-dom'
import { UseTodoList2 } from '../../hooks/useTodoList2'

const index = () => {
    const navigate = useNavigate()

    const [check1, check2 ] = UseTodoList2()
    console.log(check1,check2)
  return (
    <div>
    <div className='nav-btn-wrapper'>
      <button className='navigate-BTN' onClick={() => navigate('/')}>goto home</button>
      <button className='navigate-BTN' onClick={() => navigate('/detail')}>goto detail</button>
      </div>
    <div className='wrapper'>
    
    <TodoMain/>
     
    </div>
    </div>
  )
}

export default index
