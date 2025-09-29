import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MoonIcon, SunIcon, VideoCameraIcon } from './icons';

/**
 * PUBLIC_INTERFACE
 * Root application shell with sidebar navigation, top bar, and content area.
 * Provides light/dark mode toggle and Corporate Navy x Wildlife inspired theme.
 */
export default function App(): JSX.Element {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('vizai-theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const useDark = saved ? saved === 'dark' : prefersDark;
    setDark(useDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('vizai-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('vizai-theme', 'light');
    }
  }, [dark]);

  return (
    <div className="app-shell">
      <header className="header">
        <nav className="navbar">
          <div className="flex items-center gap-2">
            <div className="brand flex items-center gap-2">
              <VideoCameraIcon className="w-6 h-6 text-primary" />
              VizAI
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2" role="navigation" aria-label="Main">
            <TopNavLink to="/" label="Dashboard" />
            <TopNavLink to="/analysis" label="YOLO Analysis" />
            <TopNavLink to="/about" label="About" />
            <button
              aria-label="Toggle dark mode"
              className="ml-2 rounded-md p-2 hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 w-full">
        <aside className="card h-max">
          <nav className="flex flex-col gap-1" aria-label="Sidebar">
            <SideLink to="/" label="Dashboard" />
            <SideLink to="/analysis" label="YOLO Analysis" />
            <SideLink to="/about" label="About" />
          </nav>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} VizAI • Corporate Navy Theme
      </footer>
    </div>
  );
}

/** PUBLIC_INTERFACE */
function TopNavLink({ to, label }: { to: string; label: string }) {
  /** Top navigation link with active styling */
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `navlink ${isActive ? 'navlink-active' : ''}`
      }
    >
      {label}
    </NavLink>
  );
}

/** PUBLIC_INTERFACE */
function SideLink({ to, label }: { to: string; label: string }) {
  /** Sidebar navigation link with active styling */
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2 rounded-lg hover:bg-primary/5 dark:hover:bg-white/5 ${isActive ? 'bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary' : ''}`
      }
    >
      <span>{label}</span>
      <span className="text-xs text-gray-400">›</span>
    </NavLink>
  );
}
