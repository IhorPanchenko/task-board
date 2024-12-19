import {
  IoAppsOutline,
  IoGridOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoNewspaperOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoPieChartOutline,
} from "react-icons/io5";

const Sidebar = () => {
  const navLinks = [
    {
      title: "Workflows",
      active: false,
      icon: <IoPeopleOutline color={"#555555"} size={"22px"} />,
    },
    {
      title: "Home",
      active: true,
      icon: <IoHomeOutline color={"#555555"} size={"22px"} />,
    },
    {
      title: "Notifications",
      active: false,
      icon: <IoNotificationsOutline color={"#555555"} size={"22px"} />,
    },
    {
      title: "Newsletter",
      active: false,
      icon: <IoNewspaperOutline color={"#555555"} size={"22px"} />,
    },
    {
      title: "Analytics",
      active: false,
      icon: <IoPieChartOutline color={"#555555"} size={"22px"} />,
    },
    {
      title: "Boards",
      active: false,
      icon: <IoAppsOutline color={"#555555"} size={"22px"} />,
    },
    {
      title: "Projects",
      active: false,
      icon: <IoGridOutline color={"#555555"} size={"22px"} />,
    },
  ];

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

      <div className="w-full  h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-white py-4 px-3 relative">
        {navLinks.map((link) => {
          return (
            <div
              key={link.title}
              className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${
                link.active ? "bg-orange-300" : "bg-transparent"
              }`}
            >
              {link.icon}
              <span className="font-medium text-sm md:block hidden">
                {link.title}
              </span>
            </div>
          );
        })}

        <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200">
          <IoLogOutOutline />
          <span className="font-medium text-sm md:block hidden">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
