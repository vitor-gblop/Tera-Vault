import {
  HiOutlineCog,
  HiOutlineShieldCheck
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import _routes from "../config/routes";

function NavBar() {
  const location = useLocation();

  const navItems = [
    {
      path: _routes.keys,
      icon: <HiOutlineShieldCheck size={24} />,
      label: "Vault",
    },
    // { path: _routes.users, icon: <HiOutlineUsers size={24} />, label: "Usuários" },
    {
      path: _routes.settings,
      icon: <HiOutlineCog size={24} />,
      label: "Settings",
    },
  ];

  return (
    <header className="fixed bottom-6 left-0 right-0 z-50 px-4 md:relative md:bottom-auto md:top-0 md:mb-8">
      <nav className="max-w-md mx-auto bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-2 flex justify-around items-center shadow-lg md:shadow-none md:bg-transparent md:border-none md:justify-end md:gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                isActive
                  ? "text-forest-green border-b-2 border-forest-green"
                  : "text-gray-400 hover:text-warm-amber dark:hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-xs font-bold md:hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default NavBar;
