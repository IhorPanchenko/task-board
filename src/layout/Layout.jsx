import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="w-screen h-screen relative">
      <Navbar />
      <Sidebar />
      <div className="md:pl-64 pl-16 pr-5 pt-20 w-full h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
