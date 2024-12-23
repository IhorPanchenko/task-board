import { IoLogOutOutline } from "react-icons/io5";
import { navLinks } from "../../data/sidebarLinks";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 md:w-56 w-16 overflow-hidden h-full flex flex-col">
      <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-16 bg-white">
        <span className="text-orange-400 font-semibold text-2xl md:block hidden">
          Logo
        </span>
        <span className="text-orange-400 font-semibold text-2xl md:hidden block">
          L.
        </span>
      </div>

      <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-white py-4 px-3 relative">
        {navLinks.map((link) => (
          <button
            key={link.title}
            className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${
              link.active ? "bg-orange-300" : "bg-transparent"
            }`}
            aria-label={link.title}
          >
            {link.icon}
            <span className="font-medium text-sm md:block hidden">
              {link.title}
            </span>
          </button>
        ))}

        <button
          className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200"
          aria-label="Log Out"
        >
          <IoLogOutOutline />
          <span className="font-medium text-sm md:block hidden">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
