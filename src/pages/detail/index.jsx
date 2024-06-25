 import { useNavigate } from "react-router-dom"
 import { useState } from "react"

 import Profile from "../../components/profile"
 import Setting from "../../components/setting"
const index = () => {

  const navigate = useNavigate()
  const [count , setCount] = useState(0)
  return (
    <div>
      Detail
      <button onClick={() => navigate(-1)}>Back</button>
      <Profile count={count} setCount={setCount}/>
      <Setting count={count}/>
    </div>
  )
}

export default index
