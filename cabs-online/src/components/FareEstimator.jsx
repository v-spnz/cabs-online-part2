import { useState } from 'react'

var SUBURBS = {
  'Auckland CBD':       { lat: -36.8485, lng: 174.7633 },
  'Newmarket':          { lat: -36.8697, lng: 174.7764 },
  'Ponsonby':           { lat: -36.8540, lng: 174.7446 },
  'Grey Lynn':          { lat: -36.8617, lng: 174.7400 },
  'Mt Eden':            { lat: -36.8773, lng: 174.7557 },
  'Remuera':            { lat: -36.8831, lng: 174.7900 },
  'Parnell':            { lat: -36.8586, lng: 174.7779 },
  'Epsom':              { lat: -36.8927, lng: 174.7700 },
  'Onehunga':           { lat: -36.9207, lng: 174.7844 },
  'Manukau':            { lat: -36.9938, lng: 174.8800 },
  'Botany':             { lat: -36.9344, lng: 174.9146 },
  'Howick':             { lat: -36.9000, lng: 174.9333 },
  'Pakuranga':          { lat: -36.9000, lng: 174.9000 },
  'Henderson':          { lat: -36.8748, lng: 174.6363 },
  'New Lynn':           { lat: -36.9069, lng: 174.6853 },
  'Glen Innes':         { lat: -36.8833, lng: 174.8500 },
  'Panmure':            { lat: -36.9000, lng: 174.8500 },
  'Mt Wellington':      { lat: -36.9167, lng: 174.8333 },
  'Papatoetoe':         { lat: -36.9667, lng: 174.8500 },
  'Otahuhu':            { lat: -36.9500, lng: 174.8333 },
  'Takapuna':           { lat: -36.7890, lng: 174.7735 },
  'Northcote':          { lat: -36.8078, lng: 174.7459 },
  'Albany':             { lat: -36.7278, lng: 174.7017 },
  'Devonport':          { lat: -36.8290, lng: 174.8004 },
  'Browns Bay':         { lat: -36.7167, lng: 174.7500 },
  'Glenfield':          { lat: -36.7833, lng: 174.7167 },
  'Airport (Māngere)':  { lat: -37.0082, lng: 174.7850 },
}

var BASE_FARE = 4.50
var PER_KM    = 2.80

function getDistance(lat1, lng1, lat2, lng2) {
  var R    = 6371  
  var dLat = (lat2 - lat1) * Math.PI / 180
  var dLng = (lng2 - lng1) * Math.PI / 180
  var a    = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
             Math.sin(dLng / 2) * Math.sin(dLng / 2)
  var c    = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function FareEstimator() {
  const [pickup, setPickup]   = useState('')
  const [dest, setDest]       = useState('')
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState('')

  function calculateFare() {
    setError('')
    setResult(null)

    if (pickup === '') { setError('Please select a pickup suburb.'); return }
    if (dest === '')   { setError('Please select a destination suburb.'); return }
    if (pickup === dest) { setError('Pickup and destination suburbs cannot be the same.'); return }

    var p1 = SUBURBS[pickup]
    var p2 = SUBURBS[dest]

    var distKm  = getDistance(p1.lat, p1.lng, p2.lat, p2.lng)
    var lowFare = BASE_FARE + (distKm * PER_KM)
    var highFare = lowFare * 1.2  

    setResult({
      pickup:  pickup,
      dest:    dest,
      dist:    distKm.toFixed(1),
      low:     lowFare.toFixed(2),
      high:    highFare.toFixed(2),
    })
  }

  var suburbNames = Object.keys(SUBURBS).sort()

  return (
    <div>
      <div className="form-row">
        <div className="form-group">
          <label>Pickup Suburb</label>
          <select value={pickup} onChange={function(e) { setPickup(e.target.value) }}>
            <option value="">Select suburb...</option>
            {suburbNames.map(function(name) {
              return <option key={name} value={name}>{name}</option>
            })}
          </select>
        </div>

        <div className="form-group">
          <label>Destination Suburb</label>
          <select value={dest} onChange={function(e) { setDest(e.target.value) }}>
            <option value="">Select suburb...</option>
            {suburbNames.map(function(name) {
              return <option key={name} value={name}>{name}</option>
            })}
          </select>
        </div>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <button className="btn-primary" onClick={calculateFare}>
        Estimate Fare
      </button>

      {result && (
        <div className="result-box" style={{ marginTop: '28px' }}>
          <div className="fare-route">
            <span className="fare-suburb">{result.pickup}</span>
            <span className="fare-arrow">→</span>
            <span className="fare-suburb">{result.dest}</span>
          </div>
          <hr className="divider" style={{ margin: '16px 0' }} />
          <div className="fare-details">
            <div className="fare-row">
              <span>Estimated Distance</span>
              <strong>~{result.dist} km</strong>
            </div>
            <div className="fare-row">
              <span>Estimated Fare</span>
              <strong className="fare-price">${result.low} – ${result.high}</strong>
            </div>
          </div>
          <p className="fare-note">
            * Estimate only. Final fare may vary based on traffic, route, and wait time.
          </p>
        </div>
      )}

      <style>{`
        .fare-route {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .fare-suburb {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #f5f5f0;
        }
        .fare-arrow {
          color: #f5c518;
          font-size: 1.2rem;
        }
        .fare-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .fare-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .fare-row span {
          font-size: 0.85rem;
          color: #888;
        }
        .fare-row strong {
          font-size: 0.95rem;
          color: #f5f5f0;
          font-weight: 500;
        }
        .fare-price {
          color: #f5c518 !important;
          font-size: 1.2rem !important;
          font-weight: 700 !important;
          font-family: 'Syne', sans-serif;
        }
        .fare-note {
          margin-top: 16px;
          font-size: 0.78rem;
          color: #555;
        }
      `}</style>
    </div>
  )
}

export default FareEstimator