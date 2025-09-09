import { NavLink, Outlet } from "react-router-dom";
import { PlusIcon, Squares2X2Icon, ChartBarIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Navbar } from "./index";

const DashboardLayout = () => {
  const sidebarLinks = [
    { name: "Home", path: "/dashboard", icon: HomeIcon, exact: true },
    { name: "Add Lead", path: "/dashboard/add-lead", icon: PlusIcon },
    { name: "My Leads", path: "/dashboard/my-leads", icon: Squares2X2Icon },
    { name: "Reports", path: "/dashboard/reports", icon: ChartBarIcon },
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-800 flex flex-col p-4">
        <h2 className="text-xl font-bold text-gray-50 mb-6 cursor-default">Dashboard</h2>
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.exact || false} // <-- ensures exact match only for Home
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-gray-200 hover:bg-gray-700 transition-colors cursor-pointer ${
                    isActive ? "bg-gray-700 font-semibold text-white" : ""
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-2" /> {link.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">
          <div className="w-full overflow-x-auto">
            <Outlet /> {/* Nested route content */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
