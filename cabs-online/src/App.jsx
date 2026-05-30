import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import BookPage from './pages/BookPage.jsx'
import StatusPage from './pages/StatusPage.jsx'
import FarePage from './pages/FarePage.jsx'
import MapPage from './pages/MapPage.jsx'

function App() {
  const [bookings, setBookings] = useState([])

  function addBooking(booking) {
    setBookings(function(prev) {
      return [...prev, booking]
    })
  }

  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookPage onBookingComplete={addBooking} />} />
          <Route path="/status" element={<StatusPage bookings={bookings} />} />
          <Route path="/fare" element={<FarePage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App