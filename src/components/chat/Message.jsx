import React, { useEffect, useState } from "react";
import avatar from "../../assets/home/avatar.png";
import { BsSendFill, BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { FaCamera } from "react-icons/fa6";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Message = () => {
  const db = getDatabase();
  const auth = getAuth();
  const { value: user } = useSelector((store) => store.friend);
  const [msg, setMsg] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleMsgArr, setSingleMsgArr] = useState([]);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  console.log(msg, "msg");

  // handle msg onchange
  const handleChange = (e) => {
    const message = e.target.value;
    setMsg(message);
  };
  // handle emoji
  const handleEmoji = (e) => {
    setMsg((prev) => prev + e.emoji);
    // console.log(emoji.emoji);
  };
  // handle send message

  const handleSendMsg = async () => {
    setLoading(true);
    console.log("send");
    try {
      await push(ref(db, "singleMsg/"), {
        singleMsg: msg,
        whoSendMsgUid: auth.currentUser.uid,
        whoSendMsgEmail: auth.currentUser.email,
        whoSendMsgProfile_picture: auth.currentUser.photoURL,
        whoSendMsgName: auth.currentUser.displayName,
        whoRcvMsgUid: user.userUid,
        whoRcvMsgName: user.userName,
        whoRcvMsgEmail: user.userEmail,
        whoRcvMsgProfile_picture: user.userProfile_picture,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setMsg("");
      setEmoji(false);
    }
  };

  // single msg fetch
  useEffect(() => {
    const fetchingMsg = async () => {
      try {
        const singleMsgRef = ref(db, "singleMsg/");
        onValue(singleMsgRef, (snapshot) => {
          const msgArr = [];
          snapshot.forEach((msg) => {
            msgArr.push({ ...msg.val(), msgKey: msg.msgKey });
            console.log(msg.val());
          });
          setSingleMsgArr(msgArr);
        });
      } catch (err) {
        console.err(err, "error fetching msg");
      }
    };
    fetchingMsg();
  }, []);
  console.log(singleMsgArr);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div classNameName="flex gap-3 ">
      <div classNameName="w-full ">
        <div classNameName="flex items-center justify-between border-b border-b-gray-300 pb-4">
          <div classNameName="flex items-center gap-4">
            <div classNameName="w-[70px] h-[70px] rounded-full  cursor-pointer bg-white relative">
              <picture>
                <img
                  src={user?.userProfile_picture}
                  alt=""
                  classNameName="h-full w-full rounded-full object-cover"
                />
              </picture>
              <span classNameName="w-3 h-3 rounded-full bg-green-500 absolute top-[76%] right-1"></span>
            </div>
            <div classNameName="">
              <h2 classNameName="font-semibold text-lg text-black">
                {user?.userName}
              </h2>
              <span classNameName="text-grayColor text-sm font-medium">
                Online
              </span>
            </div>
          </div>
          <BsThreeDotsVertical classNameName="text-primaryColor text-lg" />
        </div>

        {/* msg content */}
        <div classNameName="mt-4 flex flex-col gap-2  border-b border-b-gray-300 overflow-y-scroll pb-4 h-[70dvh]">
          {/* {singleMsgArr?.map((msg, index) =>
            index % 2 == 0 ? (
              <div classNameName="flex flex-col w-fit self-start">
                <p classNameName=" py-2 px-3 bg-gray-300 rounded-xl">Helllo</p>
                <span classNameName="px-2 text-xs opacity-75 ">
                  Today, 10.40 pm
                </span>
              </div>
            ) : (
              <div classNameName="flex flex-col w-[350px] self-end items-end">
                <p classNameName=" py-2 px-3 bg-blue-300 rounded-xl">
                  {msg?.singleMsg}
                </p>
                <span classNameName="px-2 text-xs opacity-75 ">
                  Today, 11.40 pm
                </span>
              </div>
            )
          )} */}
          {singleMsgArr?.map((msg) => {
            if (
              auth.currentUser.uid === msg.whoSendMsgUid &&
              user.userUid === msg.whoRcvMsgUid
            ) {
              return (
                <div
                  key={msg?.msgKey}
                  classNameName="flex flex-col w-[350px] self-end items-end"
                >
                  <p classNameName=" py-2 px-3 bg-blue-300 rounded-xl">
                    {msg?.singleMsg}
                  </p>
                  <span classNameName="px-2 text-xs opacity-75 ">
                    Today, 11.40 pm
                  </span>
                </div>
              );
            } else if (
              auth.currentUser.uid === msg.whoRcvMsgUid &&
              user.userUid === msg.whoSendMsgUid
            ) {
              return (
                <div
                  key={msg?.msgKey}
                  classNameName="flex flex-col w-fit self-start"
                >
                  <p classNameName=" py-2 px-3 bg-gray-300 rounded-xl">
                    {msg?.singleMsg}
                  </p>
                  <span classNameName="px-2 text-xs opacity-75 ">
                    Today, 10.40 pm
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
        {/* msg type input */}
        <div classNameName="flex justify-between items-center  pr-5">
          <div classNameName="relative w-[90%] bg-gray-300  mt-4 ">
            <input
              type="text"
              name="msg"
              value={msg}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key == "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (msg.trim() === "") return;
                  handleSendMsg();
                }
              }}
              classNameName="w-full py-2 px-4 rounded-lg  border-none focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Type your message"
            />
            {emoji ? (
              <div classNameName="absolute right-0 -top-[450px]">
                <EmojiPicker open={emoji} onEmojiClick={handleEmoji} />
              </div>
            ) : (
              ""
            )}
            <div classNameName="absolute right-4 top-1/2 -translate-y-1/2 flex gap-4">
              {" "}
              <span
                onClick={() => setEmoji(!emoji)}
                classNameName="cursor-pointer hover:text-purple-600 duration-300 transition-all"
              >
                <HiOutlineEmojiSad classNameName="text-xl" />
              </span>
              <span
                onClick={openModal}
                classNameName="cursor-pointer hover:text-purple-600 duration-300 transition-all"
              >
                <FaCamera classNameName="text-xl" />
              </span>
              {/* open upload image modal */}
              <div>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <button onClick={closeModal}>X</button>

                  <div className="flex items-center justify-center w-full ">
                    <label
                      for="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </Modal>
              </div>
              {/* open upload image modal */}
              {/*  */}
            </div>
          </div>
          {loading ? (
            <div
              onClick={handleSendMsg}
              classNameName="px-3 py-2 mt-5 flex items-center justify-center rounded-xl bg-purple-500 cursor-pointer"
            >
              <span classNameName="text-lg text-white">Sending</span>
            </div>
          ) : (
            <div
              onClick={handleSendMsg}
              classNameName="w-9 h-9 mt-5 flex items-center justify-center rounded-full bg-purple-500 cursor-pointer"
            >
              <BsSendFill classNameName="text-lg text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
