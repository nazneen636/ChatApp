import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Chat from "./pages/Chat/chat";
import RootLayout from "./components/HomeComponent/RootLayout";
import SignIn from "./pages/signin";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notification" element={"Notification"} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
