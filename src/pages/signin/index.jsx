import React, { useState } from "react";
import image from "../../assets/sign in.jpg";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import lib from "../../lib/lib";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { FadeLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { SuccessToast, InfoToast, ErrorToast } = lib;
  const auth = getAuth();
  const database = getDatabase();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [eye, setEye] = useState(false);
  const loginChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
    console.log(loginInfo);
  };
  const handleSignIn = () => {
    const { email, password } = loginInfo;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        navigate("/");
        console.log(userCredentials.user);
      })
      .catch((error) => {
        ErrorToast(error.code, "Login failed");
        console.log(error.code, "Login failed");
      })
      .finally(() => {
        setLoading(false);
        setLoginInfo({
          email: "",
          password: "",
        });
      });
  };
  // handle google function

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userInfo) => {
        const { user } = userInfo;
        console.log(userInfo?.user?.displayName);

        const userdb = ref(database, "users/");
        set(push(userdb), {
          userid: userInfo?.user?.uid,
          username: userInfo?.user?.displayName,
          email: userInfo?.user?.email,
          profile_picture: userInfo?.user?.photoURL,
        });
      })
      .then(() => navigate("/"))
      .catch((err) => {
        console.err("Google sign in failed", err);
        ErrorToast(err.code);
      });
  };
  return (
    <div>
      {" "}
      <div className="flex">
        <div className="w-1/2 h-screen flex  justify-center flex-col px-20">
          <h1 className="font-bold text-authFontColor text-[34px] mb-3">
            Login to your account!
          </h1>
          <button
            onClick={handleGoogle}
            className="py-4 w-[220px] mt-8 flex items-center justify-center gap-3 border border-[#03014c46] rounded-lg"
          >
            <FcGoogle className="text-4xl" />
            <span className="font-semibold text-base text-authFontColor">
              Login with Google
            </span>
          </button>
          {/* sign in form */}
          <form
            className="mt-16 flex flex-col gap-9"
            action=""
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="w-[70%] flex flex-col gap-4">
              <label
                htmlFor="email"
                className="text-authFontColor opacity-50 text-sm"
              >
                Email Address
              </label>
              <input
                type="text"
                placeholder="Youraddres@email.com"
                value={loginInfo.email}
                onChange={loginChange}
                name="email"
                id="email"
                className="text-authFontColor placeholder:text-authFontColor text-lg font-semibold pb-4 border-b border-[#03014c4b] focus:outline-none"
              />
            </div>
            <div className="w-[70%] flex flex-col gap-4 relative">
              <label
                htmlFor="password"
                className="text-authFontColor opacity-50 text-sm"
              >
                Password
              </label>

              <input
                type={!eye ? "password" : "text"}
                placeholder="Enter your password"
                value={loginInfo.password}
                name="password"
                id="password"
                onChange={loginChange}
                className="text-authFontColor placeholder:text-authFontColor text-lg font-semibold pb-4 border-b border-[#03014c4b] focus:outline-none"
              />

              <div
                onClick={() => setEye(!eye)}
                className="absolute right-4 top-[50%] translate-y-1/3"
              >
                {eye ? <FaRegEye /> : <FaEyeSlash />}
              </div>
            </div>
          </form>
          <div className="w-[70%] flex flex-col">
            {loading ? (
              <button
                type="button"
                onClick={handleSignIn}
                className="bg-primaryColor rounded-lg  font-semibold text-lg text-white py-5 mt-12 mb-7"
              >
                <FadeLoader
                  height={12}
                  color={"#fff"}
                  loading={loading}
                  cssOverride={override}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="bg-primaryColor rounded-lg  font-semibold text-lg text-white py-5 mt-12 mb-7"
              >
                Login to Continue
              </button>
            )}
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
