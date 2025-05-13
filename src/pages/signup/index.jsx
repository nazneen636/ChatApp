import React, { useEffect, useState } from "react";
import image from "../../assets/signUp.png";
import lib from "../../lib/lib";
import { ClipLoader, FadeLoader } from "react-spinners";
import { Link } from "react-router";
import { getDatabase, push, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const SignUp = () => {
  useEffect(() => {
    console.log("hello");
  }, []);
  let [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getDatabase();
  const data = lib.SignUpData();
  const { SuccessToast, InfoToast, ErrorToast } = lib;

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  // error state
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameEError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "email") {
      setEmail(value);
    } else if (name == "fullname") {
      setFullName(value);
    } else {
      setPassword(value);
    }
    console.log(name, email, password);
  };

  const handleSignUp = () => {
    const errorMsg = "Input field is empty";
    if (!email) {
      setEmailError(errorMsg);
    } else if (!fullName) {
      setEmailError("");
      setFullNameEError(errorMsg);
    } else if (!password) {
      setFullNameEError("");
    } else {
      setLoading(true);
      setPasswordError("");
      createUserWithEmailAndPassword(auth, email, password, fullName)
        .then((userInfo) => {
          SuccessToast("Registration successfully");
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: "profile",
          });
        })
        .then(() => {
          const userdb = ref(db, "users/");
          set(push(userdb), {
            userid: auth.currentUser.uid,
            username: auth.currentUser.displayName || fullName,
            email: auth.currentUser.email || email,
            profile_picture:
              auth.currentUser.photoURL ||
              "https://img.freepik.com/free-vector/gradient-product-manager-linkedin-profile-picture_742173-7162.jpg?t=st=1746982998~exp=1746986598~hmac=a96833ed2bff144a914d65c126a82d15c8b7f0c2d00bdfea0670ca60ed7abb0c&w=740",
          });
          return sendEmailVerification(auth.currentUser);
        })
        .then((mailData) => InfoToast("Mail verified successfully"))
        .catch((err) => {
          ErrorToast("Registration failed:", err.code);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          setEmail("");
          setFullName("");
          setPassword("");
        });
    }
    console.log(auth.currentUser);

    // if (!email) {
    //   setEmailError(errorMsg);
    // } else {
    //   setEmailError("");
    // }
    // if (!fullName) {
    //   setFullNameEError(errorMsg);
    // } else {
    //   setFullNameEError("");
    // }
    // if (!password) {
    //   setPasswordError(errorMsg);
    // } else {
    //   setPasswordError("");
    // }
  };
  return (
    <div className="flex">
      <div className="w-1/2 h-screen flex  justify-center flex-col px-20">
        <h1 className="font-bold text-authFontColor text-[34px] mb-3">
          Get started with easily register
        </h1>
        <span className="opacity-45 text-lg">
          Free register and you can enjoy it
        </span>

        {/* sign up form */}
        <form
          className="mt-16 flex flex-col gap-9"
          action=""
          onSubmit={(e) => e.preventDefault()}
        >
          {data?.map(({ id, name, required }) => (
            <div
              key={id}
              className="w-[70%] flex flex-col border border-[#11175d54] rounded-[9px] relative text-authFontColor"
            >
              <label
                className="absolute bg-white left-[52px] top-[-14px] px-[18px] capitalize"
                htmlFor={name}
              >
                {name == "email"
                  ? "Email Address"
                  : name == "password"
                  ? "password"
                  : "Full name"}
                {required && (
                  <span className="text-red-600 ml-2 text-xl">*</span>
                )}
              </label>
              <input
                type={
                  name == "email"
                    ? "email"
                    : name == "password"
                    ? "password"
                    : "text"
                }
                name={name}
                value={
                  name == "email"
                    ? email
                    : name == "password"
                    ? password
                    : fullName
                }
                id={name}
                placeholder={`Enter your ${name}`}
                onChange={handleChange}
                className="px-[70px] py-5 focus:outline-none"
              />
              {name == "email" && email == "" ? (
                <p className="text-red-600 capitalize absolute left-1 top-full">
                  {emailError}
                </p>
              ) : name == "fullname" && fullName == "" ? (
                <p className="text-red-600 capitalize absolute left-1 top-full">
                  {fullNameError}
                </p>
              ) : name == "password" && password == "" ? (
                <p className="text-red-600 capitalize absolute left-1 top-full">
                  {passwordError}
                </p>
              ) : (
                ""
              )}
            </div>
          ))}
        </form>
        <div className="w-[70%] flex flex-col">
          {loading ? (
            <button
              onClick={handleSignUp}
              className="bg-primaryColor  rounded-full text-white py-5 mt-12 mb-7 font-semibold text-lg cursor-pointer"
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
              onClick={handleSignUp}
              className="bg-primaryColor  rounded-full text-white py-5 mt-12 mb-7 font-semibold text-lg cursor-pointer"
            >
              Sign up
            </button>
          )}
          <span className="text-center">
            Already have an account ?{" "}
            <Link className="text-orangeColor" to="/signin">
              Sign In
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
  );
};

export default SignUp;
