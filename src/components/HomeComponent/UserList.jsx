import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../assets/home/avatar.png";
import { getDatabase, ref, onValue, set, push, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import { UserListSkeleton } from "../Skeleton/UserList";
import lib from "../../lib/lib";
import { FaMinus, FaPlus } from "react-icons/fa6";

const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
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

  useEffect(() => {
    const friendRequestArr = [];
    const friendRequestRef = ref(db, "friendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      snapshot.forEach((fr) => {
        friendRequestArr.push(fr.val());
      });
      setFriendRequestList(friendRequestArr);
      console.log(friendRequestArr, "FR Arr");
    });
  }, []);
  // handle friend request
  const handleFriendRequest = (user) => {
    console.log(user);
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
      .then(() => {
        console.log("last chain");

        // const senderReceiverId = {
        //   id: currentUser?.userid + user?.userid,
        // };
        // localStorage.setItem("sendFr", JSON.stringify(senderReceiverId));
      })
      .catch((err) => console.error("Error from friend request", err));
    setSendRequest(true);
  };

  // get data from localStorage
  // const frData = localStorage.getItem("sendFr");
  // const sendReceiverId = JSON.parse(frData);
  // console.log(JSON.parse(frData));

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
          {userList?.map((user, index) => (
            <div
              className={
                userList - 1 == index
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
                  Hi Guys, Wassup!
                </p>
              </div>
              <button
                onClick={() => handleFriendRequest(user)}
                className="bg-primaryColor px-4 py-2 text-white rounded-[5px] font-semibold text-xl ml-10 cursor-pointer"
              >
                <FaPlus />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default UserList;
