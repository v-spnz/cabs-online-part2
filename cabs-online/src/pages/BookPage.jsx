import BookingForm from '../components/BookingForm.jsx'

function BookPage({ onBookingComplete }) {
  return (
    <div>
      <div className="section-header">
        <h2>Book a Taxi</h2>
        <p>Fill in your details below and we'll confirm your booking instantly.</p>
      </div>
      <div className="card">
        <BookingForm onBookingComplete={onBookingComplete} />
      </div>
    </div>
  )
}

export default BookPage