import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./components/RootLayout";
// import Home from "./pages/home/Home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Home from "./pages/home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
