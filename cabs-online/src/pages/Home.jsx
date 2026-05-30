import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const features = [
    {
      title: 'Book a Taxi',
      desc: 'Submit a new booking request with your pickup details.',
      path: '/book',
      icon: '🚕',
    },
    {
      title: 'Track Booking',
      desc: 'Enter your reference number to check your booking status.',
      path: '/status',
      icon: '📍',
    },
    {
      title: 'Fare Estimator',
      desc: 'Get an estimated fare before you book.',
      path: '/fare',
      icon: '💲',
    },
    {
      title: 'Map View',
      desc: 'See your pickup and destination location on a live map.',
      path: '/map',
      icon: '🗺️',
    },
  ]

  return (
    <div>
      <div className="hero">
        <p className="hero-label">Auckland Taxi Booking</p>
        <h1>Your ride,<br />on demand.</h1>
        <p className="hero-sub">
          Fast, simple taxi bookings across Auckland and surrounding areas.
        </p>
        <button className="btn-primary" onClick={() => navigate('/book')}>
          Book Now
        </button>
      </div>

      <hr className="divider" />

      <div className="features-grid">
        {features.map(function(feature) {
          return (
            <div
              key={feature.path}
              className="feature-card"
              onClick={() => navigate(feature.path)}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          )
        })}
      </div>

      <style>{`
        .hero {
          padding: 32px 0 48px;
        }
        .hero-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f5c518;
          margin-bottom: 16px;
        }
        .hero h1 {
          font-size: 4rem;
          margin-bottom: 16px;
          color: #f5f5f0;
        }
        .hero-sub {
          font-size: 1.1rem;
          color: #888;
          margin-bottom: 32px;
          max-width: 480px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .feature-card {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          padding: 28px;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .feature-card:hover {
          border-color: #f5c518;
          transform: translateY(-2px);
        }
        .feature-icon {
          font-size: 1.8rem;
          display: block;
          margin-bottom: 12px;
        }
        .feature-card h3 {
          color: #f5f5f0;
          margin-bottom: 8px;
        }
        .feature-card p {
          font-size: 0.9rem;
          color: #888;
        }
      `}</style>
    </div>
  )
}

export default Home