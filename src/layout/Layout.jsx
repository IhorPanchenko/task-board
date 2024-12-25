import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div className="w-screen h-screen relative">
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />
      <Sidebar />
      <div className="md:pl-64 pl-16 pr-5 pt-20 w-full h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
