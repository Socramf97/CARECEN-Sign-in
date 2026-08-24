import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { LandingPage } from './pages/LandingPage'
import { GuestsPage } from './pages/Guests'
import { StaffPage } from './pages/Staff'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guests" element={<GuestsPage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </>
  )
}

export default App
