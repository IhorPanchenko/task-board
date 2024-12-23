import {
  IoChevronDownOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoSettingsOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] gap-2 fixed flex items-center justify-between pl-2 pr-6 h-20 top-0 md:left-[230px] left-16 border-b border-slate-300 bg-white">
      {/* User Section */}
      <div className="flex items-center gap-3 cursor-pointer">
        <IoPersonOutline color="#fb923c" size="1.75rem" />
        <span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
          Board Name
        </span>
        <IoChevronDownOutline color="#fb923c" size="1rem" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 md:w-[700px] w-32 bg-gray-100 rounded-lg px-3 py-3">
        <IoSearchOutline color="#999999" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 outline-none text-sm"
        />
      </div>

      {/* Icons Section */}
      <div className="md:flex hidden items-center gap-4">
        {[
          { icon: IoShareSocialOutline, label: "Share" },
          { icon: IoSettingsOutline, label: "Settings" },
          { icon: IoNotificationsOutline, label: "Notifications" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer"
            aria-label={label}
          >
            <Icon color="#444444" />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
