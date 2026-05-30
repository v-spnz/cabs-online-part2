import FareEstimator from '../components/FareEstimator.jsx'

function FarePage() {
  return (
    <div>
      <div className="section-header">
        <h2>Fare Estimator</h2>
        <p>Select your pickup and destination suburbs to get an estimated fare before you book.</p>
      </div>
      <div className="card">
        <FareEstimator />
      </div>
    </div>
  )
}

export default FarePage