import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Scan } from './components/Scan';
import { Home } from './components/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
      </Routes>
    </>
  )
}

export default App
