import React from "react";
import avatar from "../../assets/home/avatar.png";
import { BsThreeDotsVertical } from "react-icons/bs";

const Message = () => {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-b-gray-300  pb-4">
        <div className="flex items-center gap-4">
          <div className="w-[70px] h-[70px] rounded-full  cursor-pointer bg-white relative">
            <picture>
              <img
                src={avatar}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </picture>
            <span className="w-3 h-3 rounded-full bg-green-500 absolute top-[76%] right-1"></span>
          </div>
          <div className="">
            <h2 className="font-semibold text-lg text-black">
              Friends Reunion
            </h2>
            <span className="text-grayColor text-sm font-medium">Online</span>
          </div>
        </div>
        <BsThreeDotsVertical className="text-primaryColor text-lg" />
      </div>
    </div>
  );
};

export default Message;
