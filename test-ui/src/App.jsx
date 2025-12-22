import { useState } from 'react'
import { Signup } from './components/Signup'
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
