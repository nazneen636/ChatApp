import React from "react";
import profile from "../assets/profile.jpg";

const Sidebar = () => {
  return (
    <div className="w-[186px] h-[95dvh] rounded-[20px] bg-primaryColor">
      {/* profile */}
      <div className="w-[100px] h-[100px] rounded-full bg-black">
        <picture>
          <img src={profile} alt="" className="h-full w-full rounded-full" />
        </picture>
      </div>
    </div>
  );
};

export default Sidebar;
