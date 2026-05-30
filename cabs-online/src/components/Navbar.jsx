import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          Cabs<span>Online</span>
        </NavLink>
        <ul className="navbar-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/book" className={({ isActive }) => isActive ? 'active' : ''}>Book</NavLink></li>
          <li><NavLink to="/status" className={({ isActive }) => isActive ? 'active' : ''}>Track</NavLink></li>
          <li><NavLink to="/fare" className={({ isActive }) => isActive ? 'active' : ''}>Fare</NavLink></li>
          <li><NavLink to="/map" className={({ isActive }) => isActive ? 'active' : ''}>Map</NavLink></li>
        </ul>
      </div>

      <style>{`
        .navbar {
          background: #0a0a0a;
          border-bottom: 1px solid #1a1a1a;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          color: #f5f5f0;
          text-decoration: none;
          letter-spacing: -0.02em;
        }
        .navbar-logo span {
          color: #f5c518;
        }
        .navbar-links {
          list-style: none;
          display: flex;
          gap: 32px;
        }
        .navbar-links a {
          color: #888;
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .navbar-links a:hover,
        .navbar-links a.active {
          color: #f5c518;
        }
      `}</style>
    </nav>
  )
}

export default Navbar