import {
  IoChevronDownOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoSettingsOutline,
  IoShareSocialOutline,
  IoAlbumsOutline,
  IoChevronUpOutline,
  IoEllipsisVertical,
} from "react-icons/io5";

import logo from "../../assets/logo.svg";
import { useState } from "react";
import HeaderDropdown from "./HeaderDropdown";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      {/* <nav className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] gap-2 fixed flex items-center justify-between pl-2 pr-6 h-20 top-0 md:left-[230px] left-16 border-b border-slate-300 bg-white">
        
        <div className="flex items-center gap-3 cursor-pointer">
          <IoPersonOutline color="#fb923c" size="1.75rem" />
          <span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
            Board Name
          </span>
          <IoChevronDownOutline color="#fb923c" size="1rem" />
        </div>

        
        <div className="flex items-center gap-2 md:w-[700px] w-32 bg-gray-100 rounded-lg px-3 py-3">
          <IoSearchOutline color="#999999" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 outline-none text-sm"
          />
        </div>

        
        <div className="md:flex hidden items-center gap-4">
          {[
            { icon: IoShareSocialOutline, label: "Share" },
            { icon: IoSettingsOutline, label: "Settings" },
            { icon: IoNotificationsOutline, label: "Notifications" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-colors"
              aria-label={label}
            >
              <Icon color="#444444" />
            </button>
          ))}
        </div>
      </nav> */}

      <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
        <header className="flex justify-between dark:text-white items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={logo} alt="logo" className="h-6 w-6" />
            <h3 className="hidden md:inline-block font-bold md:text-3xl">
              Task Board
            </h3>

            <div className="flex items-center">
              <h3 className="truncate max-w-48 md:text-2xl text-xl font-bold md:ml-20">
                Board Name
              </h3>

              <div
                onClick={() => setOpenDropdown((state) => !state)}
                className="w-3 ml-2 md:hidden cursor-pointer"
              >
                {openDropdown ? (
                  <IoChevronUpOutline />
                ) : (
                  <IoChevronDownOutline />
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 items-center md:space-x-6">
            <button className="hidden md:block button">+ Add New Task</button>

            <button className="button py-1 px-3 md:hidden">+</button>

            <IoEllipsisVertical className="w-6 h-6 text-gray-500 cursor-pointer" />
          </div>
        </header>

        {openDropdown && <HeaderDropdown setOpenDropdown={setOpenDropdown} />}
      </div>
    </>
  );
};

export default Header;
