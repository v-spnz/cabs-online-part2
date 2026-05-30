import { useState } from 'react'

function BookingStatus({ bookings }) {
  const [brn, setBrn]         = useState('')
  const [booking, setBooking] = useState(null)
  const [error, setError]     = useState('')

  function handleSearch() {
    setError('')
    setBooking(null)

    var trimmed = brn.trim()

    if (trimmed === '') {
      setError('Please enter a booking reference number.')
      return
    }

    var brnRegex = /^BRN\d{5}$/
    if (!brnRegex.test(trimmed)) {
      setError('Invalid format. Reference number must follow the format BRN00001.')
      return
    }

    var found = null
    for (var i = 0; i < bookings.length; i++) {
      if (bookings[i].ref === trimmed) {
        found = bookings[i]
        break
      }
    }

    if (!found) {
      setError('No booking found for ' + trimmed + '. Try making a booking first.')
      return
    }

    setBooking(found)
  }

  return (
    <div>
      <div className="form-group">
        <label>Booking Reference Number</label>
        <input
          type="text"
          value={brn}
          onChange={function(e) { setBrn(e.target.value) }}
          placeholder="e.g. BRN00001"
        />
      </div>

      {error && <p className="error-msg">{error}</p>}

      <button className="btn-primary" onClick={handleSearch}>
        Check Status
      </button>

      {booking && (
        <div className="result-box" style={{ marginTop: '28px' }}>
          <div className="status-header">
            <span className="status-ref">{booking.ref}</span>
            <span className={'badge ' + (booking.status === 'assigned' ? 'badge-assigned' : 'badge-unassigned')}>
              {booking.status}
            </span>
          </div>
          <hr className="divider" style={{ margin: '16px 0' }} />
          <div className="status-details">
            <div className="status-row"><span>Name</span><strong>{booking.cname}</strong></div>
            <div className="status-row"><span>Phone</span><strong>{booking.phone}</strong></div>
            <div className="status-row"><span>Pickup Suburb</span><strong>{booking.sbname || '—'}</strong></div>
            <div className="status-row"><span>Destination</span><strong>{booking.dsbname || '—'}</strong></div>
            <div className="status-row"><span>Pickup Date & Time</span><strong>{booking.date} {booking.time}</strong></div>
          </div>
        </div>
      )}

      <style>{`
        .status-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .status-ref {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          color: #f5f5f0;
        }
        .status-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .status-row span {
          font-size: 0.85rem;
          color: #888;
        }
        .status-row strong {
          font-size: 0.95rem;
          color: #f5f5f0;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

export default BookingStatus