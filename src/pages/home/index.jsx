import React from "react";
import Sidebar from "../../components/Sidebar";
import MainContent from "./MainContent";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Home;
