import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../assets/home/avatar.png";
const Blockuser = () => {
  const [arrLength, setArrLength] = useState(20);
  return (
    <div>
      <div className="shadow-lg rounded-[20px] border border-red-300 px-5 pt-4 h-[47dvh]">
        <div className="flex justify-between items-center mb-4 h-[2dvh]">
          <h1 className="font-semibold text-xl">
            Block <span className="text-green-600">{arrLength}</span>
          </h1>
          <BsThreeDotsVertical className="text-primaryColor text-lg" />
        </div>
        <div className="overflow-y-scroll customScroll h-[40dvh] mt-4">
          {[...new Array(arrLength)].map((_, index) => (
            <div
              className={
                arrLength - 1 == index
                  ? "flex items-center gap-4 pb-1"
                  : "flex items-center gap-4 border-b border-b-gray-300  pb-1"
              }
            >
              <div className="w-[70px] h-[70px] rounded-full  cursor-pointer bg-white">
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
                <p className="text-grayColor text-sm font-medium">Dinner?</p>
              </div>
              <button className="bg-primaryColor px-4 text-white rounded-[5px] font-semibold text-base ml-10">
                Unblock
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blockuser;
