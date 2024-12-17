import {
  ChevronDown,
  NotificationsOutline,
  PersonOutline,
  SearchOutline,
  SettingsOutline,
  ShareSocialOutline,
} from "react-ionicons";

const Navbar = () => {
  return (
    <div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] gap-2 fixed flex items-center justify-between pl-2 pr-6 h-20 top-0 md:left-[230px] left-16 border-b border-slate-300 bg-white">
      <div className="flex items-center gap-3 cursor-pointer">
        <PersonOutline color={"#fb923c"} width={"1.75rem"} height={"1.75rem"} />
        <span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
          Board Name
        </span>

        <ChevronDown color={"#fb923c"} width={"1rem"} height={"1rem"} />
      </div>

      <div className="flex items-center gap-2 md:w-[700px] w-32 bg-gray-100 rounded-lg px-3 py-3">
        <SearchOutline color={"#999999"} />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 outline-none text-sm"
        />
      </div>

      <div className="md:flex hidden items-center gap-4">
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <ShareSocialOutline color={"#444444"} />
        </div>
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <SettingsOutline color={"#444444"} />
        </div>
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <NotificationsOutline color={"#444444"} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
