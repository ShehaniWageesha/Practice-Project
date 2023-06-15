import User from "./pages/user";
import Home from "./pages/home"
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <main>
        <Routes>
          <>
            <Route path="/" element={<User />} />
            {isLoggedIn && (
              <Route path="/home" element={<Home />} />
            )}
          </>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
