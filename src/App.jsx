import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
// import SignUp from "./pages/signup";
// import Home from "./pages/home";
// import Chat from "./pages/Chat/chat";
// import RootLayout from "./components/HomeComponent/RootLayout";
// import SignIn from "./pages/signin";
// import Message from "./components/chat/Message";
// import Chat from "./pages/Chat/Chat";

const SignUp = lazy(() => import("./pages/signup/index"));
const Home = lazy(() => import("./pages/home/index"));
const SignIn = lazy(() => import("./pages/signin/index"));
const Chat = lazy(() => import("./pages/Chat/Chat"));
const RootLayout = lazy(() => import("./components/HomeComponent/RootLayout"));

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="text-red-700 text-2xl flex items-center justify-center h-screen">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/notification" element={"Notification"} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
