import React from 'react'
import useDetailStore from '../../stores/useDetailStore'

const index = () => {
    const count = useDetailStore(state => state.count)
  return (
    <div>
       
        <div>{count}</div>
        <div>--------------------------</div>
    </div>
  )
}

export default index
