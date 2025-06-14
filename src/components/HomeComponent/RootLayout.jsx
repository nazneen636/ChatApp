import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserNotVerified from "../../pages/Error/UserNotVerified";
import NotSignedIn from "../../pages/Error/NotSigned";

const RootLayout = () => {
  const auth = getAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsVerified(user.emailVerified);
      } else {
        setCurrentUser(null);
        setIsVerified(false);
      }
    });
    return () => unsubscribe();
  }, []);
  console.log(auth.currentUser);

  let content = null;
  if (isVerified) {
    content = (
      <div className="h-[95dvh] flex gap-4">
        <Sidebar />
        <div className="rounded-[20px] w-full ">
          <Outlet />
        </div>
      </div>
    );
  } else if (!currentUser) {
    console.log(currentUser);

    content = <NotSignedIn />;
  } else {
    content = <UserNotVerified />;
  }
  return <>{content}</>;
};

export default RootLayout;
