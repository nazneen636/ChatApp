import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../assets/home/avatar.png";
import { getDatabase, ref, onValue, set, push, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import { UserListSkeleton } from "../Skeleton/UserList";
import lib from "../../lib/lib";
import { FaMinus, FaPlus, FaUser } from "react-icons/fa6";
import Alert from "../commonComponent/Alert";

const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [actualFriendList, setActualFriendList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [sendRequest, setSendRequest] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "users/");
    const fetchUserData = () => {
      setLoading(true);
      let userArr = [];
      onValue(userRef, (snapshot) => {
        snapshot.forEach((user) => {
          if (auth.currentUser.uid !== user.val().userid) {
            userArr.push({ ...user.val(), userKey: user.key });
          } else {
            setCurrentUser({ ...user.val(), userKey: user.key });
          }
        });

        setUserList(userArr);
        setLoading(false);
      });
    };
    fetchUserData();
    // cleanup function
    return () => {
      off(userRef);
    };
  }, []);

  // fetch data if friend
  useEffect(() => {
    const frRef = ref(db, "friends/");
    const frArr = [];

    onValue(frRef, (snapshot) => {
      snapshot.forEach((singleFr) => {
        const senderId = singleFr.val().whoSendFriendRequestUid;
        const receiverId = singleFr.val().whoReceiveFriendRequestUid;

        const id1 = senderId + receiverId;
        const id2 = receiverId + senderId;

        frArr.push(id1, id2); // Both combinations
      });

      setActualFriendList(frArr);
    });

    return () => off(frRef);
  }, []);

  // fetch data from friend request
  useEffect(() => {
    const friendRequestArr = [];
    const friendRequestRef = ref(db, "friendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      snapshot.forEach((fr) => {
        if (auth.currentUser.uid == fr.val().whoSendFriendRequestUid)
          friendRequestArr.push(
            auth?.currentUser?.uid.concat(fr.val().whoReceiveFriendRequestUid)
          );
      });
      setFriendRequestList(friendRequestArr);
    });

    return () => off(friendRequestRef);
  }, []);
  console.log(actualFriendList);

  // handle friend request
  const handleFriendRequest = (user) => {
    set(push(ref(db, "friendRequest/")), {
      whoSendFriendRequestName:
        currentUser?.username || auth?.currentUser?.displayName,
      whoSendFriendRequestEmail: currentUser.email || auth?.currentUser?.email,
      whoSendFriendRequestProfile_picture:
        currentUser.profile_picture || auth?.currentUser?.photoURL,
      whoSendFriendRequestUid: currentUser.userid || auth?.currentUser?.uid,
      whoSendFriendRequestKey: currentUser.userKey || "",
      whoReceiveFriendRequestName: user?.username || "",
      whoReceiveFriendRequestEmail: user?.email || "",
      whoReceiveFriendRequestProfile_picture: user?.profile_picture || "",
      whoReceiveFriendRequestUid: user?.userid || "",
      whoReceiveFriendRequestKey: user?.userKey || "",
      createdAt: lib.GetTimeNow(),
    })
      .then(() => {
        set(push(ref(db, "notification/")), {
          notificationMsg: `${
            currentUser?.username || auth?.currentUser?.displayName
          } sent friend request ${user?.username}`,
          createdAt: lib.GetTimeNow(),
        });
      })
      .then(() => {
        lib.SuccessToast(
          `${
            currentUser?.username || auth?.currentUser?.displayName
          } sent friend request ${user?.username}`,
          "bottom-right"
        );
      })
      .catch((err) => console.error("Error from friend request", err));
    setSendRequest(true);
  };

  let content = null;
  if (loading) {
    content = <UserListSkeleton />;
  } else {
    content = (
      <div className="shadow-lg rounded-[20px] border border-red-300 p-5 h-[51dvh]">
        <div className="flex justify-between items-center mb-4 h-[2dvh]">
          <h1 className="font-semibold text-xl">
            User List <span className="text-green-600">{userList.length}</span>
          </h1>
          <BsThreeDotsVertical className="text-primaryColor text-lg" />
        </div>
        <div className="overflow-y-scroll customScroll h-[40dvh] mt-4 px-1">
          {userList.length >= 1 ? (
            userList?.map((user, index) => (
              <div
                className={
                  userList.length - 1 == index
                    ? "flex items-center gap-4 pb-1"
                    : "flex items-center gap-4 border-b border-b-gray-300 py-2"
                }
              >
                <div className="w-[50px] h-[50px] rounded-full  cursor-pointer bg-white">
                  <picture>
                    <img
                      src={user?.profile_picture || avatar}
                      alt=""
                      className="h-full w-full rounded-full object-cover"
                    />
                  </picture>
                </div>
                <div className="w-[40%]">
                  <h2 className="font-semibold text-lg text-black">
                    {user?.username}
                  </h2>
                  <p className="text-grayColor text-sm font-medium">
                    {user?.email || "email"}
                  </p>
                </div>
                {actualFriendList.includes(
                  auth?.currentUser?.uid.concat(user?.userid)
                ) ||
                actualFriendList.includes(
                  user?.userid.concat(auth?.currentUser?.uid)
                ) ? (
                  <button className="bg-primaryColor px-4 py-2 text-white rounded-[5px] font-semibold text-xl ml-10 cursor-pointer">
                    <FaUser />
                  </button>
                ) : friendRequestList.includes(
                    auth?.currentUser?.uid.concat(user?.userid)
                  ) ? (
                  <button className="bg-primaryColor px-4 py-2 text-white rounded-[5px] font-semibold text-xl ml-10 cursor-pointer">
                    <FaMinus />
                  </button>
                ) : (
                  <button
                    onClick={() => handleFriendRequest(user)}
                    className="bg-primaryColor px-4 py-2 text-white rounded-[5px] font-semibold text-xl ml-10 cursor-pointer"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
            ))
          ) : (
            <Alert />
          )}
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default UserList;
