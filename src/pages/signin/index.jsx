import React from "react";
import image from "../../assets/sign in.jpg";
import { Link } from "react-router";

const SignIn = () => {
  return (
    <div>
      {" "}
      <div className="flex">
        <div className="w-1/2 h-screen flex  justify-center flex-col px-20">
          <h1 className="font-bold text-authFontColor text-[34px] mb-3">
            Login to your account!
          </h1>

          {/* sign in form */}
          {/* <form
            className="mt-16 flex flex-col gap-9"
            action=""
            onSubmit={(e) => e.preventDefault()}
          >
            {data?.map(({ id, name, required }) => (
              <div className="w-[70%] flex flex-col border border-[#11175d54] rounded-[9px] relative text-authFontColor">
                <label
                  className="absolute bg-white left-[52px] top-[-14px] px-[18px] capitalize"
                  htmlFor="email"
                >
                  {name == "email"
                    ? "Email Address"
                    : name == "password"
                    ? "password"
                    : "Full name"}
                  {required ? <span className="text-red-600 ml-2">*</span> : ""}
                </label>
                <input
                  type={
                    name == "email"
                      ? "email"
                      : name == "password"
                      ? "password"
                      : "text"
                  }
                  name="email"
                  id="email"
                  placeholder={`Enter your ${name}`}
                  className="px-[70px] py-5 focus:outline-none"
                />
              </div>
            ))}
          </form> */}
          <div className="w-[70%] flex flex-col">
            <button className="bg-primaryColor  rounded-lg font-semibold text-lg text-white py-5 mt-12 mb-7">
              Login to Continue
            </button>
            <span className="text-center">
              Don’t have an account ?{" "}
              <Link className="text-orangeColor" to="/signup">
                Sign up
              </Link>
            </span>
          </div>
        </div>

        <div className="w-1/2 h-screen overflow-hidden">
          <picture>
            <img src={image} alt="" className="object-cover w-full" />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
