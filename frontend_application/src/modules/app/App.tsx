import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function App(): JSX.Element {
  /**
   * Root application shell providing header navigation, content area, and footer
   * following the Corporate Navy theme and classic layout.
   */
  return (
    <div className="app-shell">
      <header className="header">
        <nav className="navbar">
          <div className="brand">Corporate Navy</div>
          <div className="navlinks" role="navigation" aria-label="Main">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            {' '}
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
          </div>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} Corporate Navy App
      </footer>
    </div>
  );
}
