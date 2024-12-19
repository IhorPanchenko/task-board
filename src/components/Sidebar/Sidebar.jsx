import {
  AppsOutline,
  GridOutline,
  HomeOutline,
  LogOutOutline,
  NewspaperOutline,
  NotificationsOutline,
  PeopleOutline,
  PieChartOutline,
} from "react-ionicons";

const Sidebar = () => {
  const navLinks = [
    {
      title: "Home",
      active: false,
      icon: <HomeOutline color={"#555555"} width={"22px"} height={"22px"} />,
    },
    {
      title: "Boards",
      active: true,
      icon: <AppsOutline color={"#555555"} width={"22px"} height={"22px"} />,
    },
    {
      title: "Projects",
      active: false,
      icon: <GridOutline color={"#555555"} width={"22px"} height={"22px"} />,
    },
    {
      title: "Analytics",
      active: false,
      icon: (
        <PieChartOutline color={"#555555"} width={"22px"} height={"22px"} />
      ),
    },
    {
      title: "Workflows",
      active: false,
      icon: <PeopleOutline color={"#555555"} width={"22px"} height={"22px"} />,
    },
    {
      title: "Notifications",
      active: false,
      icon: (
        <NotificationsOutline
          color={"#555555"}
          width={"22px"}
          height={"22px"}
        />
      ),
    },
    {
      title: "Newsletter",
      active: false,
      icon: (
        <NewspaperOutline color={"#555555"} width={"22px"} height={"22px"} />
      ),
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
          <LogOutOutline />
          <span className="font-medium text-sm md:block hidden">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
