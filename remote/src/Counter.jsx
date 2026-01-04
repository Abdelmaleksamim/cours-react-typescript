import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
  return (
    <div>
        <button onClick={() => setCount(count + 1)}>add one</button>
        <button onClick={() => setCount(count -1)}>delete one</button>
        <div>Count = {count}</div>
    </div>
  )
}
export default Counter;