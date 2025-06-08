import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../assets/home/avatar.png";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import lib from "../../lib/lib";
import moment from "moment";
import { FriendListSkeleton } from "../Skeleton/FriendListSkeleton";
const BlockUser = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [blockUser, setBlockUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let blockUserArr = [];
    const blockRef = ref(db, "blockList/");
    onValue(blockRef, (snapshot) => {
      snapshot.forEach((block) => {
        if (auth.currentUser.uid == block.val().whoReceiveFriendRequestUid) {
          blockUserArr.push({ ...block.val(), blockKey: block.key });
        }
      });
      setBlockUser(blockUserArr);
      setLoading(false);
    });
    return () => off(blockRef);
  }, []);

  if (loading) {
    <FriendListSkeleton />;
  }
  return (
    <div>
      {loading ? (
        <FriendListSkeleton />
      ) : (
        <div className="shadow-lg rounded-[20px] border border-red-300 px-5 pt-4 h-[47dvh]">
          <div className="flex justify-between items-center mb-4 h-[2dvh]">
            <h1 className="font-semibold text-xl">
              Block <span className="text-green-600">{blockUser.length}</span>
            </h1>
            <BsThreeDotsVertical className="text-primaryColor text-lg" />
          </div>
          <div className="overflow-y-scroll customScroll h-[40dvh] mt-4">
            {blockUser.map((bl, index) => (
              <div
                className={
                  blockUser.length - 1 == index
                    ? "flex items-center gap-4 pb-1"
                    : "flex items-center gap-4 border-b border-b-gray-300  pb-1"
                }
              >
                <div className="w-[70px] h-[70px] rounded-full  cursor-pointer bg-white">
                  <picture>
                    <img
                      src={bl?.whoSendFriendRequestProfile_picture || avatar}
                      alt=""
                      className="h-full w-full rounded-full object-cover"
                    />
                  </picture>
                </div>
                <div className="">
                  <h2 className="font-semibold text-lg text-black">
                    {bl?.whoSendFriendRequestName}
                  </h2>
                  <p className="text-grayColor text-sm font-medium">
                    {moment(bl.createdAt).fromNow()}
                  </p>
                </div>
                <button className="bg-primaryColor px-4 text-white rounded-[5px] font-semibold text-base ml-10">
                  Unblock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockUser;
