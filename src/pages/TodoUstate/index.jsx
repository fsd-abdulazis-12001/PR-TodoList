import TodoMain from '../../components/todo/TodoMain'
import { useNavigate } from 'react-router-dom'
import { UseTodoList2 } from '../../hooks/useTodoList2'

const index = () => {
    const navigate = useNavigate()

    const [check1, check2 ] = UseTodoList2()
    console.log(check1,check2)
  return (
    <div className='wrapper'>
    
    <TodoMain/>
    <button onClick={() => navigate('/detail')}>goto detail</button>
    </div>
  )
}

export default index
