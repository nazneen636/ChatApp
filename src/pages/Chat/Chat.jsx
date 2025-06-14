import React from "react";
import GroupList from "../../components/HomeComponent/GroupList";
import Friends from "../../components/HomeComponent/Friends";
import Message from "../../components/chat/Message";


const Chat = () => {
  return (
    <div className="grid grid-cols-3 gap-x-5 gap-y-6">
      <div className="flex flex-col gap-5">
        <div className=" h-[48dvh]">
          <GroupList />
        </div>
        <div className=" h-[48dvh]">
          <Friends buttonVisible={true} />
        </div>
      </div>
      {/* <div className="bg-red-300 h-full"></div> */}
      <div className=" rounded-[20px] col-span-2 h-full">
        <Message />
      </div>
    </div>
  );
};

export default Chat;
