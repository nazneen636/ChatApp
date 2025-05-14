import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../assets/home/avatar.png";
import lib from "../../lib/lib";
import { getDatabase, ref, onValue, off, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { FriendListSkeleton } from "../Skeleton/FriendListSkeleton";
import Alert from "../commonComponent/Alert";

const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();

  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const friendRef = ref(db, "friends/");
    const friendArr = [];
    onValue(friendRef, (snapshot) => {
      snapshot.forEach((friend) => {
        if (auth?.currentUser?.uid == friend.val().whoReceiveFriendRequestUid) {
          friendArr.push({ ...friend.val(), friendKey: friend.key });
        }
      });
      setFriendList(friendArr);
      setLoading(false);
    });
    return () => off(friendRef);
  }, []);
  console.log(friendList, "ff");

  let content = null;
  if (loading) {
    content = <FriendListSkeleton />;
  } else {
    content = (
      <div>
        <div className="shadow-lg rounded-[20px] border border-red-300 p-5 h-[47dvh]">
          <div className="flex justify-between items-center mb-4 h-[2dvh]">
            <h1 className="font-semibold text-xl">
              Friends{" "}
              <span className="text-green-600">{friendList.length}</span>
            </h1>
            <BsThreeDotsVertical className="text-primaryColor text-lg" />
          </div>
          <div className="overflow-y-scroll customScroll h-[40dvh] mt-4">
            {friendList.length > 0 ? (
              friendList?.map((fr, index) => (
                <div
                  className={
                    friendList.length - 1 == index
                      ? "flex items-center gap-4 pb-1"
                      : "flex items-center gap-4 border-b border-b-gray-300  pb-1"
                  }
                >
                  <div className="w-[70px] h-[70px] rounded-full  cursor-pointer bg-white">
                    <picture>
                      <img
                        src={fr?.whoSendFriendRequestProfile_picture || avatar}
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                      />
                    </picture>
                  </div>
                  <div className="w=[50%]">
                    <h2 className="font-semibold text-lg text-black">
                      {fr?.whoSendFriendRequestName || "name missing"}
                    </h2>
                    <p className="text-grayColor text-sm font-medium">
                      Dinner?
                    </p>
                  </div>
                  <p className="ml-10 opacity-90 text-grayColor text-sm font-medium">
                    {moment(fr.createdAt).fromNow()}
                  </p>
                </div>
              ))
            ) : (
              <Alert title={"Friends"} />
            )}

            {}
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default Friends;
