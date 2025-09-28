import { NavLink } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Collapsible sidebar navigation for Import, Analysis, and Dashboard with smooth slide animation.
 * Props:
 * - open: boolean — whether sidebar is visible
 * - onClose: function — optional handler to close (used on small screens)
 */
export default function Sidebar({ open = true, onClose }) {
  return (
    <aside
      className={[
        "w-[256px] shrink-0 border-r border-gray-200 bg-white flex flex-col min-h-screen",
        "transform transition-transform duration-200 ease-sidebar sticky top-0 z-30",
        open ? "translate-x-0" : "-translate-x-full",
        "max-[900px]:w-[220px]",
      ].join(" ")}
      aria-hidden={!open}
      aria-label="Primary"
    >
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 relative">
        <div className="h-8 w-8 rounded-md bg-primary text-white grid place-items-center font-extrabold text-[12px]" aria-hidden="true">
          WM
        </div>
        <div>
          <div className="text-[14px] font-semibold text-gray-900">Wildlife Monitor</div>
          <div className="text-[11px] text-gray-500">Corporate Navy</div>
        </div>
        <button
          type="button"
          className="ml-auto border border-gray-200 bg-white w-7 h-7 rounded-md text-gray-600 cursor-pointer leading-none hidden max-[900px]:grid place-items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          <span aria-hidden="true" className="text-lg -mt-0.5">×</span>
        </button>
      </div>

      <nav className="p-3 grid gap-1.5" aria-label="Main navigation">
        <NavItem to="/" label="Import Media" icon="⬆️" end />
        <NavItem to="/analysis" label="Analysis" icon="🧠" />
        <NavItem to="/dashboard" label="Dashboard" icon="📊" />
      </nav>

      <div className="mt-auto p-4 text-[12px] text-gray-500">
        <p className="m-0 mb-1.5 text-gray-600 font-semibold">Hints</p>
        <ul className="m-0 pl-5 grid gap-1.5 list-disc">
          <li>Upload files in Import</li>
          <li>Overlay detections in Analysis</li>
          <li>View trends in Dashboard</li>
        </ul>
      </div>
    </aside>
  );
}

function NavItem({ to, label, icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[14px] text-gray-700 border border-transparent",
          "hover:bg-gray-50 hover:text-primary",
          isActive ? "bg-blue-50 text-primary border-blue-200" : "",
        ].join(" ")
      }
    >
      <span className="text-[16px]" aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
