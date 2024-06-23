import React from 'react'
import useDetailStore from '../../stores/useDetailStore'


const index = () => {

    const count = useDetailStore(state => state.count)
    const setCount = useDetailStore(state => state.setCount)
  return (
    <div>
        <div>--------------------------</div>
        <button onClick={() => setCount(count + 1)}>Count+</button>

        <div>{count}</div>
        <div>--------------------------</div>
    </div>
  )
}

export default index
