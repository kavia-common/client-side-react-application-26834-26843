import { NavLink } from "react-router-dom";

// PUBLIC_INTERFACE
export default function SidebarNavigation() {
  /** Sidebar navigation for the app sections: Import, Analysis, Dashboard */
  const baseLink =
    "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium";
  const activeClasses = "bg-blue-50 text-primary border border-blue-100";
  const inactiveClasses =
    "text-gray-700 hover:bg-gray-50 hover:text-primary";

  return (
    <aside className="h-full w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary/90 text-white flex items-center justify-center font-bold">
            VA
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Vision Analyzer</p>
            <p className="text-xs text-gray-500">Corporate Navy</p>
          </div>
        </div>
      </div>

      <nav className="p-3 space-y-1">
        <NavItem to="/" label="Import" icon="⬆️" baseLink={baseLink} activeClasses={activeClasses} inactiveClasses={inactiveClasses} end />
        <NavItem to="/analysis" label="Analysis" icon="🧠" baseLink={baseLink} activeClasses={activeClasses} inactiveClasses={inactiveClasses} />
        <NavItem to="/dashboard" label="Dashboard" icon="📊" baseLink={baseLink} activeClasses={activeClasses} inactiveClasses={inactiveClasses} />
      </nav>

      <div className="mt-auto p-4 text-xs text-gray-500">
        <p className="font-medium text-gray-600">Hints</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Upload videos/images in Import</li>
          <li>Review detections in Analysis</li>
          <li>Explore trends in Dashboard</li>
        </ul>
      </div>
    </aside>
  );
}

function NavItem({ to, label, icon, baseLink, activeClasses, inactiveClasses, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${baseLink} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
