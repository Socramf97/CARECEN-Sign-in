import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { LandingPage } from './pages/LandingPage'
import { GuestsPage } from './pages/Guests'
import { StaffPage } from './pages/StaffList'
import { HomePage } from './pages/Home'
import { AuthProvider } from './context/AuthSession'
import { StaffCheckIn } from './pages/StaffCheckIn'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/staff-checkin" element={<StaffCheckIn />} />
          <Route path="/guests" element={<GuestsPage />} />
          <Route path="/staff-list" element={<StaffPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
