import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { LandingPage } from './pages/LandingPage'
import { GuestsPage } from './pages/Guests'
import { StaffPage } from './pages/Staff'
import { HomePage } from './pages/Home'
import { AuthProvider } from './context/AuthSession'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/guests" element={<GuestsPage />} />
          <Route path="/staff" element={<StaffPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
