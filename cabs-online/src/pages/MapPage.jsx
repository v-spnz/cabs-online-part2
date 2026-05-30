import MapView from '../components/MapView.jsx'

function MapPage() {
  return (
    <div>
      <div className="section-header">
        <h2>Map View</h2>
        <p>Select your pickup and destination suburbs to see them plotted on the map.</p>
      </div>
      <div className="card">
        <MapView />
      </div>
    </div>
  )
}

export default MapPage