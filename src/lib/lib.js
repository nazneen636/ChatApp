import { Bounce, Slide, toast } from "react-toastify";

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
_.SuccessToast = (msg = "success message missing") => {
  toast.success(msg, {
    position: "bottom-right",
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

export default _;
