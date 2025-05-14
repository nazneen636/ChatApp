import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../assets/home/avatar.png";
import lib from "../../lib/lib";
import Alert from "../commonComponent/Alert";
import {
  getDatabase,
  remove,
  ref,
  onValue,
  off,
  set,
  push,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { FriendRequestListSkeleton } from "../Skeleton/FriendRequestSkeleton";

const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  console.log(auth);

  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const frRequestRef = ref(db, "friendRequest/");
    const frRequestArr = [];
    onValue(frRequestRef, (snapshot) => {
      snapshot.forEach((fr) => {
        if (auth?.currentUser?.uid === fr.val().whoReceiveFriendRequestUid)
          frRequestArr.push({ ...fr.val(), frKey: fr.key });
      });
      setFriendRequestList(frRequestArr);
      setLoading(false);
    });
    return () => off(frRequestRef);
  }, []);

  // handle friend request accept
  const handleAccept = (frInfo) => {
    console.log(frInfo, "frinfor");
    const frRef = ref(db, "friends/");
    const friendsArr = [];
    set(push(frRef), {
      // friendName: frInfo?.whoSendFriendRequestName,
      // friendEmail: frInfo?.whoSendFriendRequestEmail,
      // friendProfile_picture: frInfo?.whoSendFriendRequestProfile_picture,
      // friendUid: frInfo?.whoSendFriendRequestUid,
      // friendKey: frInfo?.whoSendFriendRequestKey,
      ...frInfo,
      createdAt: lib.GetTimeNow(),
    })
      .then(() => {
        set(push(ref(db, "notification/")), {
          notificationMsg: `${auth?.currentUser?.displayName} accept ${frInfo.whoSendFriendRequestName} friend request`,
          createdAt: lib.GetTimeNow(),
        });
      })
      .then(() => {
        console.log(frInfo, "frInfo");
        const frRef = ref(db, `friendRequest/${frInfo?.frKey}`);
        return remove(frRef);
      })
      .then(() => {
        lib.SuccessToast(
          `${frInfo.whoSendFriendRequestName} is now your friend.`
        );
      })
      .catch((err) => {
        console.error("Accept friend request failed", err);
      });

    // setFriends(friendsArr);
    console.log(friends);
  };

  const handleReject = (fr) => {
    const frRef = ref(db, `friendRequest/${fr.frKey}`);
    remove(frRef);
  };

  let content = null;
  if (loading) {
    content = <FriendRequestListSkeleton />;
  } else {
    content = (
      <div>
        <div>
          <div className="shadow-lg rounded-[20px] border border-red-300 p-5 h-[47dvh]">
            <div className="flex justify-between items-center mb-4 h-[2dvh]">
              <h1 className="font-semibold text-xl">
                Friend Request{" "}
                <span className="text-green-600">
                  {friendRequestList.length}
                </span>
              </h1>
              <BsThreeDotsVertical className="text-primaryColor text-lg" />
            </div>
            <div className="overflow-y-scroll customScroll h-[40dvh] mt-4">
              {friendRequestList.length >= 1 ? (
                friendRequestList?.map((fr, index) => (
                  <div
                    key={fr?.frKey}
                    className={
                      friendRequestList.length - 1 == index
                        ? "flex items-center gap-4 pb-1"
                        : "flex items-center gap-4 border-b border-b-gray-300  pb-1"
                    }
                  >
                    <div className="w-[70px] h-[70px] rounded-full  cursor-pointer bg-white">
                      <picture>
                        <img
                          src={
                            fr?.whoSendFriendRequestProfile_picture || avatar
                          }
                          alt={fr?.whoSendFriendRequestProfile_picture}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </picture>
                    </div>
                    <div className="w-[35%] ">
                      <h2 className="font-semibold text-lg text-black">
                        {fr?.whoSendFriendRequestName}
                      </h2>
                      <p className="text-grayColor text-sm font-medium">
                        {moment(fr?.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="submit"
                        onClick={() => handleAccept(fr)}
                        className="bg-primaryColor px-4 text-white rounded-[5px] font-semibold text-xl cursor-pointer"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(fr)}
                        className="bg-red-600 px-4 text-white rounded-[5px] font-semibold text-xl"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <Alert title="friend request" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default FriendRequest;
