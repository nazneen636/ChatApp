import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import avatar from "../../assets/home/avatar.png";
import { FaPlus } from "react-icons/fa6";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    border: "1px solid var(--primaryColor)",
    borderRadius: "8px",
    width: "50%",
  },
};
const GroupList = () => {
  const [arrLength, setArrLength] = useState(5);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    groupTitle: "",
    groupTag: "",
    groupProfile: "",
  });
  const [groupError, setGroupError] = useState({});

  // handle change
  // const handleChange = (e) => {
  //   const { files, id, value } = e.target;
  //   setGroupInfo({
  //     ...groupInfo,
  //     [id]: id == "groupImages" ? files[0] : value,
  //   });
  // };

  const handleChange = (e) => {
    const { files, id, value } = e.target;

    const field = id === "groupProfile" ? "groupProfile" : id;
    const newValue = id === "groupProfile" ? files[0] : value;

    setGroupInfo((prev) => ({
      ...prev,
      [field]: newValue,
    }));

    // Clear the specific error
    setGroupError((prevErrors) => ({
      ...prevErrors,
      [`${field}Error`]: "",
    }));
  };

  // handle validation
  // const handleValidation = () => {
  //   let error = {};
  //   const { groupTitle, groupTag, groupProfile } = groupInfo;
  //   for (let field in groupInfo) {
  //     if (groupInfo[field] == "") {
  //       error[`${field}Error`] = `${field} missing`;
  //     }
  //   }
  //   console.log(error);
  //   setGroupError(error);
  // };

  const handleValidation = () => {
    const errors = {};

    if (!groupInfo.groupTitle.trim()) {
      errors.groupTitleError = "Group title is required.";
    }

    if (!groupInfo.groupTag.trim()) {
      errors.groupTagError = "Group tag is required.";
    }

    if (!groupInfo.groupProfile) {
      errors.groupProfileError = "Group profile image is required.";
    }

    setGroupError(errors);

    // Return true if no errors
    return Object.keys(errors).length === 0;
  };

  // handle create
  // const handleCreate = () => {
  //   console.log("ok");
  //   handleValidation();
  // };

  const handleCreate = async () => {
    if (handleValidation()) {
      // proceed with form submission or next steps
      console.log("Form is valid. Submitting:", groupInfo);
    } else {
      console.log("Form has errors.");
    }
    const formData = new FormData();
    formData.append("file", groupInfo.groupProfile);
    formData.append("upload_preset", "Nazneen");
    console.log(formData, "dd");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzfesj1vk/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("secure data", data);
    } catch (err) {
      console.log(err);
    }
  };

  // open modal
  const openModal = () => {
    setIsOpen(true);
    console.log("ok");
  };

  // close modal
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="h-[40dvh]">
      {/* search bar */}
      <div className="w-full shadow-lg  rounded-[20px] py-2 px-5 mb-2 flex items-center justify-between ">
        <HiMiniMagnifyingGlass className="text-lg" />
        <input
          type="search"
          placeholder="Search"
          className="border-none px-4 py-1 focus:outline-none"
        />
        <BsThreeDotsVertical className="text-primaryColor text-lg" />
      </div>

      {/* Groups */}
      <div className="shadow-lg rounded-[20px] border border-red-300 mt-[1dvh] p-5">
        <div className="flex justify-between items-center mb-4 h-[2dvh]">
          <h1 className="font-semibold text-xl">
            Group List <span className="text-green-600">{arrLength}</span>
          </h1>
          <BsThreeDotsVertical className="text-primaryColor text-lg" />
        </div>
        <button
          onClick={openModal}
          className="bg-green-700 flex items-center justify-center gap-1 w-[80%] border-none mb-4 cursor-pointer px-4 py-1 text-lg text-white rounded-[5px] font-semibold  ml-10"
        >
          <FaPlus /> Create Group
        </button>

        <div className="overflow-y-scroll customScroll h-[26dvh] pb-1">
          {[...new Array(arrLength)].map((_, index) => (
            <div
              className={
                arrLength - 1 == index
                  ? "flex items-center gap-4  pb-1"
                  : "flex items-center gap-4 border-b border-b-gray-300  pb-1"
              }
            >
              <div className="w-[70px] h-[70px] rounded-full cursor-pointer bg-white">
                <picture>
                  <img
                    src={avatar}
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                </picture>
              </div>
              <div className="">
                <h2 className="font-semibold text-lg text-black">
                  Friends Reunion
                </h2>
                <p className="text-grayColor text-sm font-medium">
                  Hi Guys, Wassup!
                </p>
              </div>
              <button className="bg-primaryColor px-4 text-white rounded-[5px] font-semibold text-xl ml-10">
                Join
              </button>
            </div>
          ))}
        </div>

        {/* modal open */}
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button
              className="float-right text-white cursor-pointer py-2 font-semibold px-4 rounded-full bg-red-700 "
              onClick={closeModal}
            >
              X
            </button>

            <div class="max-w-2xl mx-auto p-4">
              <form
                // action="/submit-post"
                // method="POST"
                onSubmit={(e) => e.preventDefault()}
              >
                <div class="mb-6 relative">
                  <label
                    for="groupTitle"
                    class="block text-lg font-medium text-gray-800 mb-1"
                  >
                    Group Title
                  </label>
                  <input
                    type="text"
                    id="groupTitle"
                    name="groupTitle"
                    onChange={handleChange}
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                  />
                  {groupError.groupTitleError && (
                    <span className="text-red-600 text-base absolute left-2 top-full capitalize">
                      {groupError.groupTitleError}
                    </span>
                  )}
                </div>

                <div class="mb-6 relative">
                  <label
                    for="groupTag"
                    class="block text-lg font-medium text-gray-800 mb-1"
                  >
                    Group Tag Name
                  </label>
                  <textarea
                    id="groupTag"
                    name="groupTag"
                    onChange={handleChange}
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    rows="6"
                    required
                  ></textarea>
                  {groupError.groupTagError && (
                    <span className="text-red-600 text-base absolute left-2 top-full capitalize">
                      {groupError.groupTagError}
                    </span>
                  )}
                </div>

                <div class="mb-6 relative">
                  <label
                    for="groupProfile"
                    class="block text-lg font-medium text-gray-800 mb-1"
                  >
                    Group Profile
                  </label>
                  <input
                    type="file"
                    id="groupProfile"
                    onChange={handleChange}
                    name="groupProfile"
                    accept="image/*"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 "
                  />
                  {groupError.groupProfileError && (
                    <span className="text-red-600 text-base absolute left-2 top-full capitalize">
                      {groupError.groupProfileError}
                    </span>
                  )}
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleCreate}
                    class="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        {/* modal open */}
      </div>
    </div>
  );
};

export default GroupList;
