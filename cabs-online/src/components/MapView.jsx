import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

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

function FitBounds({ positions }) {
  var map = useMap()
  if (positions.length === 2) {
    map.fitBounds(positions, { padding: [60, 60] })
  }
  return null
}

function MapView() {
  const [pickup, setPickup]       = useState('')
  const [dest, setDest]           = useState('')
  const [mapData, setMapData]     = useState(null)
  const [error, setError]         = useState('')

  function showOnMap() {
    setError('')
    setMapData(null)

    if (pickup === '') { setError('Please select a pickup suburb.'); return }
    if (dest === '')   { setError('Please select a destination suburb.'); return }
    if (pickup === dest) { setError('Pickup and destination suburbs cannot be the same.'); return }

    var p1 = SUBURBS[pickup]
    var p2 = SUBURBS[dest]

    setMapData({
      pickup: { name: pickup, lat: p1.lat, lng: p1.lng },
      dest:   { name: dest,   lat: p2.lat, lng: p2.lng },
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

      <button className="btn-primary" onClick={showOnMap}>
        Show on Map
      </button>

      <div className="map-wrapper">
        <MapContainer
          center={[-36.8485, 174.7633]}
          zoom={11}
          style={{ height: '420px', width: '100%', borderRadius: '8px', marginTop: '24px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {mapData && (
            <>
              <Marker position={[mapData.pickup.lat, mapData.pickup.lng]}>
                <Popup>📍 Pickup: {mapData.pickup.name}</Popup>
              </Marker>

              <Marker position={[mapData.dest.lat, mapData.dest.lng]}>
                <Popup>🏁 Destination: {mapData.dest.name}</Popup>
              </Marker>

              <Polyline
                positions={[
                  [mapData.pickup.lat, mapData.pickup.lng],
                  [mapData.dest.lat,   mapData.dest.lng],
                ]}
                color="#f5c518"
                weight={3}
                dashArray="6 6"
              />

              <FitBounds
                positions={[
                  [mapData.pickup.lat, mapData.pickup.lng],
                  [mapData.dest.lat,   mapData.dest.lng],
                ]}
              />
            </>
          )}
        </MapContainer>
      </div>

      {mapData && (
        <div className="map-legend">
          <span>📍 {mapData.pickup.name}</span>
          <span className="map-legend-arrow">→</span>
          <span>🏁 {mapData.dest.name}</span>
        </div>
      )}

      <style>{`
        .map-wrapper {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #2a2a2a;
        }
        .map-legend {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 14px;
          font-size: 0.9rem;
          color: #888;
          font-family: 'DM Sans', sans-serif;
        }
        .map-legend-arrow {
          color: #f5c518;
        }
      `}</style>
    </div>
  )
}

export default MapView