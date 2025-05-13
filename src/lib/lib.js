import { Bounce, Slide, toast } from "react-toastify";
import moment from "moment";

const _ = {};
_.SignUpData = () => {
  const signUpItem = [
    {
      id: 1,
      name: "email",
      required: true,
    },
    {
      id: 2,
      name: "fullname",
      required: false,
    },
    {
      id: 3,
      name: "password",
      required: true,
    },
  ];
  return signUpItem;
};
_.SuccessToast = (msg = "success message missing", position = "top-right") => {
  toast.success(msg, {
    position: position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
};
_.InfoToast = (msg = "info message missing") => {
  toast.info(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
_.ErrorToast = (msg = "success message missing") => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

// time and date
_.GetTimeNow = () => {
  return moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
};
export default _;
