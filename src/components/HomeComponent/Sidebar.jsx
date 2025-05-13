import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.jpg";
import lib from "../../lib/lib";
import { IoMdCloudUpload } from "react-icons/io";
import { IoChatbubbleEllipses, IoHome, IoLogOutSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import { FaGear } from "react-icons/fa6";
import { FaBell, FaEdit } from "react-icons/fa";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";
const navigationItem = [
  { id: 1, icon: <IoHome />, path: "/" },
  { id: 2, icon: <IoChatbubbleEllipses />, path: "/chat" },
  { id: 3, icon: <FaBell />, path: "/notification" },
  { id: 4, icon: <FaGear />, path: "/setting" },
  { id: 5, icon: <IoLogOutSharp />, path: "/logout" },
];

// handleNavigation

const Sidebar = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path = "/") => {
    navigate(path);
    console.log(path);
  };

  const { SuccessToast, ErrorToast } = lib;
  useEffect(() => {
    const fetchData = () => {
      const userRef = ref(db, "users/");
      onValue(userRef, (snapshot) => {
        let obj = {};
        snapshot.forEach((item) => {
          if (auth.currentUser.uid == item.val().userid)
            obj = { ...item.val(), userKey: item.key };
        });
        setUserData(obj);
      });
    };
    fetchData();
  }, []);
  console.log(userData, "sidebar");
  console.log(auth.currentUser.displayName, "currentUser");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    document.body.appendChild(script);
    console.log(script);
  }, []);

  const handleProfilePicture = () => {
    console.log("hello");

    cloudinary.openUploadWidget(
      {
        cloudName: "dzfesj1vk",
        uploadPreset: "Nazneen",
        searchByRights: true,
        googleApiKey: "AIzaSyAPSvRNBpPeXhqIfMBTP2v-6kWYjjfCLMo",
        searchBySites: ["all", "cloudinary.com"],
        sources: [
          "local",
          "url",
          "image_search",
          "unsplash",
          "shutterstock",
          "dropbox",
          "camera",
          "gettyimages",
          "istock",
        ],
      },
      (error, result) => {
        if (error) {
          throw new Error("upload failed", error);
        }
        if (result.info.secure_url) {
          update(ref(db, `users/${userData.userKey}`), {
            profile_picture: result.info.secure_url,
          }).then(() => {
            SuccessToast("Update Profile Successfully");
          });
          updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL,
          })
            .then(() => {
              SuccessToast("Update Profile Successfully");
            })
            .catch((error) => {
              console.log("Updating failed", error);
            });
        }
      }
    );
  };

  // const handleProfileDetails = () => {
  //   update(ref(db, `users/${userData.userKey}`), {
  //     username: auth?.currentUser?.displayName,
  //   }).then(() => {
  //     SuccessToast("Update Profile Successfully");
  //   });
  //   updateProfile(auth.currentUser, {
  //     displayName: displayName,
  //     photoURL: photoURL,
  //   })
  //     .then(() => {
  //       SuccessToast("Update Profile Successfully");
  //     })
  //     .catch((error) => {
  //       console.log("Updating failed", error);
  //     });
  // };
  // console.log(auth.currentUser.displayName, "auth profile");

  return (
    <div className="w-[150px] h-[95dvh] rounded-[20px] bg-primaryColor flex flex-col items-center">
      {/* profile */}
      <div className="flex flex-col items-center justify-center">
        <div
          onClick={handleProfilePicture}
          className="w-[100px] h-[100px] rounded-full bg-black relative group cursor-pointer mt-8"
        >
          <picture>
            <img
              src={userData?.profile_picture || profile}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </picture>
          <div className="absolute left-0 top-0 h-full w-full rounded-full bg-[#0000007a] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <IoMdCloudUpload className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-3xl" />
        </div>
        <h1 className=" text-center text-white text-base font-semibold mt-2 flex gap-1 items-center">
          {userData?.username || "User Name"}{" "}
          {/* <span onClick={handleProfileDetails}>
            <FaEdit className="text-white text-base" />
          </span> */}
        </h1>
        <p className="text-white text-[10px] mt-1">
          {userData?.email || "email"}
        </p>
      </div>

      {/* navigation icon */}
      <div className="mt-12 w-full flex items-center flex-col gap-10">
        {navigationItem?.map(({ id, icon, path }, index) =>
          navigationItem.length - 1 == index ? (
            <span
              onClick={() => handleNavigation(path)}
              key={id}
              className={
                location.pathname == path
                  ? "text-3xl text-white mt-8 py-2 cursor-pointer active"
                  : "text-3xl text-white mt-8 py-2 cursor-pointer"
              }
            >
              {icon}
            </span>
          ) : (
            <span
              onClick={() => handleNavigation(path)}
              key={id}
              className={
                location.pathname == path
                  ? "text-3xl text-white py-2 cursor-pointer active"
                  : "text-3xl text-white py-2 cursor-pointer"
              }
            >
              {icon}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
