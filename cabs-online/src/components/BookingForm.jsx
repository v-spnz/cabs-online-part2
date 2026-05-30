import { useState, useEffect } from 'react'

var bookingCounter = 1

function generateBRN() {
  var num = String(bookingCounter).padStart(5, '0')
  bookingCounter++
  return 'BRN' + num
}

function BookingForm({ onBookingComplete }) {
  const [form, setForm] = useState({
    cname: '',
    phone: '',
    unumber: '',
    snumber: '',
    stname: '',
    sbname: '',
    dsbname: '',
    date: '',
    time: '',
  })

  const [message, setMessage] = useState('')
  const [error, setError]     = useState('')

  useEffect(function() {
    var now = new Date()

    var day   = String(now.getDate()).padStart(2, '0')
    var month = String(now.getMonth() + 1).padStart(2, '0')
    var year  = now.getFullYear()

    var hours   = String(now.getHours()).padStart(2, '0')
    var minutes = String(now.getMinutes()).padStart(2, '0')

    setForm(function(prev) {
      return {
        ...prev,
        date: day + '/' + month + '/' + year,
        time: hours + ':' + minutes,
      }
    })
  }, [])

  function handleChange(e) {
    var name  = e.target.name
    var value = e.target.value
    setForm(function(prev) {
      return { ...prev, [name]: value }
    })
  }

  function handleSubmit() {
    setError('')
    setMessage('')

    if (form.cname.trim() === '')   { setError('Customer name is required.'); return }
    if (form.phone.trim() === '')   { setError('Phone number is required.'); return }
    if (form.snumber.trim() === '') { setError('Street number is required.'); return }
    if (form.stname.trim() === '')  { setError('Street name is required.'); return }
    if (form.date.trim() === '')    { setError('Pick-up date is required.'); return }
    if (form.time.trim() === '')    { setError('Pick-up time is required.'); return }

    var phoneRegex = /^\d{10,12}$/
    if (!phoneRegex.test(form.phone.trim())) {
      setError('Phone number must be digits only and between 10 to 12 digits long.')
      return
    }

    var dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
    if (!dateRegex.test(form.date.trim())) {
      setError('Date must be in dd/mm/yyyy format.')
      return
    }

    var timeRegex = /^\d{2}:\d{2}$/
    if (!timeRegex.test(form.time.trim())) {
      setError('Time must be in HH:MM format.')
      return
    }

    var dateParts      = form.date.split('/')
    var pickupDateTime = new Date(
      dateParts[2],
      dateParts[1] - 1,
      dateParts[0],
      form.time.split(':')[0],
      form.time.split(':')[1]
    )
    if (pickupDateTime < new Date()) {
      setError('Pick-up date and time cannot be in the past.')
      return
    }

    var brn = generateBRN()
    var booking = {
      ref:      brn,
      cname:    form.cname.trim(),
      phone:    form.phone.trim(),
      unumber:  form.unumber.trim(),
      snumber:  form.snumber.trim(),
      stname:   form.stname.trim(),
      sbname:   form.sbname.trim(),
      dsbname:  form.dsbname.trim(),
      date:     form.date.trim(),
      time:     form.time.trim(),
      status:   'unassigned',
    }

    if (onBookingComplete) {
      onBookingComplete(booking)
    }

    setMessage(
      'Thank you for your booking!<br>' +
      'Booking reference number: ' + brn + '<br>' +
      'Pickup time: ' + form.time.trim() + '<br>' +
      'Pickup date: ' + form.date.trim()
    )
  }

  return (
    <div>
      <div className="form-group">
        <label>Customer Name *</label>
        <input type="text" name="cname" value={form.cname} onChange={handleChange} placeholder="e.g. John Smith" />
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="10–12 digits" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Unit Number (optional)</label>
          <input type="text" name="unumber" value={form.unumber} onChange={handleChange} placeholder="e.g. 4B" />
        </div>
        <div className="form-group">
          <label>Street Number *</label>
          <input type="text" name="snumber" value={form.snumber} onChange={handleChange} placeholder="e.g. 12" />
        </div>
      </div>

      <div className="form-group">
        <label>Street Name *</label>
        <input type="text" name="stname" value={form.stname} onChange={handleChange} placeholder="e.g. Queen Street" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Suburb (optional)</label>
          <input type="text" name="sbname" value={form.sbname} onChange={handleChange} placeholder="e.g. Auckland CBD" />
        </div>
        <div className="form-group">
          <label>Destination Suburb (optional)</label>
          <input type="text" name="dsbname" value={form.dsbname} onChange={handleChange} placeholder="e.g. Newmarket" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Pick-Up Date *</label>
          <input type="text" name="date" value={form.date} onChange={handleChange} placeholder="dd/mm/yyyy" />
        </div>
        <div className="form-group">
          <label>Pick-Up Time *</label>
          <input type="text" name="time" value={form.time} onChange={handleChange} placeholder="HH:MM" />
        </div>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <button className="btn-primary" onClick={handleSubmit}>
        Book Now
      </button>

      {message && (
        <div className="result-box">
          <p dangerouslySetInnerHTML={{ __html: message }} />
        </div>
      )}
    </div>
  )
}

export default BookingForm