import { BsThreeDotsVertical } from "react-icons/bs";

export const UserListSkeleton = () => {
  return (
    <div className="shadow-lg rounded-[20px] border border-red-300 p-5 h-[51dvh]">
      <div className="flex justify-between items-center mb-4 h-[2dvh]">
        <h1 className="font-semibold text-xl">
          User List <span className="text-green-600"></span>
        </h1>
        <BsThreeDotsVertical className="text-primaryColor text-lg" />
      </div>
      <div className="overflow-y-scroll customScroll h-[40dvh] mt-4">
        {[...new Array(5)]?.map((_, index) => (
          <div className="flex items-center gap-4  py-2">
            <div className="w-[50px] h-[50px] rounded-full  cursor-pointer bg-gray-300"></div>
            <div className="w-[60%] bg-gray-300 py-4">
              <h2 className="font-semibold text-lg text-black"></h2>
              <p className="text-grayColor text-sm font-medium"></p>
            </div>
            <button className="bg-gray-300 px-4 text-white rounded-[5px] font-semibold text-xl ml-10">
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
