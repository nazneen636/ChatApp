import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../assets/home/avatar.png";
import lib from "../../lib/lib";
import { friendAction } from "../../Features/Slices/friendSlice";
import {
  getDatabase,
  ref,
  onValue,
  off,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { FriendListSkeleton } from "../Skeleton/FriendListSkeleton";
import Alert from "../commonComponent/Alert";
import { useDispatch, useSelector } from "react-redux";

const Friends = ({ buttonVisible = false }) => {
  const db = getDatabase();
  const auth = getAuth();

  const [friendList, setFriendList] = useState([]);
  const [block, setBlock] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // fetch friend list
  useEffect(() => {
    const friendRef = ref(db, "friends/");
    const friendArr = [];
    onValue(friendRef, (snapshot) => {
      snapshot.forEach((friend) => {
        if (
          auth?.currentUser?.uid === friend.val().whoReceiveFriendRequestUid ||
          auth?.currentUser?.uid === friend.val().whoSendFriendRequestUid
        ) {
          friendArr.push({ ...friend.val(), friendKey: friend.key });
        }
      });
      setFriendList(friendArr);
      setLoading(false);
    });
    return () => off(friendRef);
  }, []);
  console.log(friendList, "ff");

  //  fetch blocklist data
  useEffect(() => {
    const BlockRef = ref(db, "blockList/");
    const blockArr = [];
    onValue(BlockRef, (snapshot) => {
      snapshot.forEach((block) => {
        if (auth.currentUser.uid == block.val().whoReceiveFriendRequestUid) {
          blockArr.push(
            auth?.currentUser?.uid.concat(block.val()?.whoSendFriendRequestUid)
          );
        }
      });
      setBlockList(blockArr);
      setLoading(false);
    });
  }, []);

  // handle block function
  const handleBlock = (frInfo = {}) => {
    setBlock((prev) => {
      return !prev;
    });
    push(ref(db, "blockList/"), {
      ...frInfo,
      createdAt: lib.GetTimeNow(),
    }).then(() => {
      const frRef = ref(db, `friends/${frInfo.friendKey}`);
      remove(frRef);
    });
  };
  const SendMsg = (frInfo) => {
    console.log("sending", frInfo);
    if (frInfo?.whoSendFriendRequestUid == auth.currentUser.uid) {
      let userInfo = {
        userUid: frInfo.whoReceiveFriendRequestUid,
        userKey: frInfo.whoReceiveFriendRequestKey,
        userName: frInfo.whoReceiveFriendRequestName,
        userEmail: frInfo.whoReceiveFriendRequestEmail,
        userProfile_picture: frInfo.whoReceiveFriendRequestProfile_picture,
      };
      dispatch(friendAction(userInfo));
    } else {
      let userInfo = {
        userUid: frInfo.whoSendFriendRequestUid,
        userKey: frInfo.whoSendFriendRequestKey,
        userName: frInfo.whoSendFriendRequestName,
        userEmail: frInfo.whoSendFriendRequestEmail,
        userProfile_picture: frInfo.whoSendFriendRequestProfile_picture,
      };

      dispatch(friendAction(userInfo));
      console.log(userInfo, "userInfo");
    }
  };

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
                  onClick={() => SendMsg(fr)}
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
                      {moment(fr.createdAt).fromNow()}
                    </p>
                  </div>
                  {buttonVisible ? (
                    <button
                      type="button"
                      onClick={() => SendMsg(fr)}
                      className="bg-purple-600 focus-ring-white px-4 py-1 text-white rounded-[5px] font-semibold text-lg"
                    >
                      {" "}
                      Send Message
                    </button>
                  ) : (
                    <div className="flex gap-1">
                      <button className="bg-primaryColor px-4 py-1 text-white rounded-[5px] font-semibold text-lg">
                        Unfriend
                      </button>
                      {blockList.includes(
                        auth.currentUser.uid.concat(fr.whoSendFriendRequestUid)
                      ) ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleBlock(fr)}
                          className="bg-red-600 focus-ring-white px-4 py-1 text-white rounded-[5px] font-semibold text-lg"
                        >
                          {" "}
                          Block
                        </button>
                      )}
                    </div>
                  )}
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
