
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
 
const TodoDone = ({ doneTodos ,deleteDoneTodo,deleteallDoneTodo}) => {


  return (
    <div className='done-wrapper'>
        <button className="close-btn" onClick={() =>  deleteallDoneTodo()}>X</button>
      <h1>Done List</h1>
      {doneTodos.map((todo, index) => (
        <div key={index} className='Todo'>
          <p className='completed'>{todo.task}</p>
          <FontAwesomeIcon 
          icon = {faTrash}
          onClick = {() => deleteDoneTodo(todo.id)}/>
        </div>
      ))}
    </div>
  );
};

export default TodoDone;
