import React from "react";
import GroupList from "../../components/HomeComponent/GroupList";
import Friends from "../../components/HomeComponent/Friends";
import UserList from "../../components/HomeComponent/UserList";
import FriendRequest from "../../components/HomeComponent/FriendRequest";
import Group from "../../components/HomeComponent/Group";
import BlockUser from "../../components/HomeComponent/BlockUser";

const index = () => {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-8">
      <div className=" h-[48dvh]">
        <GroupList />
      </div>
      <div className=" h-[48dvh]">
        <Friends />
      </div>
      <div className=" h-[48dvh]">
        <UserList />
      </div>
      <div className="h-[48dvh]">
        <FriendRequest />
      </div>
      <div className="h-[48dvh]">
        <Group />
      </div>
      <div className="h-[48dvh]">
        <BlockUser />
      </div>
    </div>
  );
};

export default index;
