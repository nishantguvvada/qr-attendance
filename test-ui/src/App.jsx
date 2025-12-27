import { Signup } from './components/Signup'
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Scan } from './components/Scan';
import { Services } from './components/Services';
import { MainLayout } from './components/MainLayout';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
