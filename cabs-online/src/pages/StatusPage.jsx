import BookingStatus from '../components/BookingStatus.jsx'

function StatusPage({ bookings }) {
  return (
    <div>
      <div className="section-header">
        <h2>Track Your Booking</h2>
        <p>Enter your booking reference number to check whether your taxi has been assigned.</p>
      </div>
      <div className="card">
        <BookingStatus bookings={bookings} />
      </div>
    </div>
  )
}

export default StatusPage