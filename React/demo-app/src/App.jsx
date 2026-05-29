import { useState } from "react"
import Header from "./components/Header"

function App() {
  let user = {
    name: "Jay",
    age:23
  }

  const [count,setCount] = useState(0)

  function handleClick(){
    setCount(count + 1) 
  }
  
  return (
    <>
      <Header user={user} />
      <p>Counter is : {count}</p>
      <button onClick={handleClick}>Click Me</button>
    </>
  )
}

export default App