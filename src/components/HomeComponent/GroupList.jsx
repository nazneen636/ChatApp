import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import avatar from "../../assets/home/avatar.png";

const GroupList = () => {
  const [arrLength, setArrLength] = useState(5);
  return (
    <div className="h-[50dvh]">
      {/* search bar */}
      <div className="w-full shadow-lg  rounded-[20px] py-2 px-5 mb-2 flex items-center justify-between ">
        <HiMiniMagnifyingGlass className="text-lg" />
        <input
          type="search"
          placeholder="Search"
          className="border-none px-4 py-1 focus:outline-none"
        />
        <BsThreeDotsVertical className="text-primaryColor text-lg" />
      </div>

      {/* Groups */}
      <div className="shadow-lg rounded-[20px] border border-red-300 mt-[1dvh] p-5">
        <div className="flex justify-between items-center mb-4 h-[2dvh]">
          <h1 className="font-semibold text-xl">
            Group List <span className="text-green-600">{arrLength}</span>
          </h1>
          <BsThreeDotsVertical className="text-primaryColor text-lg" />
        </div>
        <div className="overflow-y-scroll customScroll h-[34dvh] pb-1">
          {[...new Array(arrLength)].map((_, index) => (
            <div
              className={
                arrLength - 1 == index
                  ? "flex items-center gap-4  pb-1"
                  : "flex items-center gap-4 border-b border-b-gray-300  pb-1"
              }
            >
              <div className="w-[70px] h-[70px] rounded-full cursor-pointer bg-white">
                <picture>
                  <img
                    src={avatar}
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                </picture>
              </div>
              <div className="">
                <h2 className="font-semibold text-lg text-black">
                  Friends Reunion
                </h2>
                <p className="text-grayColor text-sm font-medium">
                  Hi Guys, Wassup!
                </p>
              </div>
              <button className="bg-primaryColor px-4 text-white rounded-[5px] font-semibold text-xl ml-10">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupList;
