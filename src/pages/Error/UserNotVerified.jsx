import { getAuth } from "firebase/auth";
import React from "react";

const auth = getAuth();
const handleMailBox = () => {
  if (auth.currentUser.email.split("@")[1].split(".")[0] == "gmail") {
    window.open("https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox");
  } else if (auth.currentUser.email.split("@")[1].split(".")[0] == "yahoo") {
    window.open("https://mail.yahoo.com/");
  }
};

const UserNotVerified = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-4xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            onClick={handleMailBox}
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go to mailbox
          </a>
        </div>
      </div>
    </main>
  );
};

export default UserNotVerified;
