import { useState } from 'react'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      Hi todo <span>app!</span>
    </div>
  )
}

export default App
