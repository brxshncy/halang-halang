import React from "react";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-light-2 p-4">
      <Header />
      <div className="flex gap-5 my-4">
        <SideBar />
        <div className="container bg-light-1 mx-auto rounded-lg py-6 px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
