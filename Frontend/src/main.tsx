import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.tsx";
import "./index.css";

import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/pages/redux/store.ts";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "./lib/hooks/hooks.ts";
import ExpenssForm from "./pages/ExpenssForm/ExpenssForm.tsx";
import PrimaryLayout from "./PrimaryLayout.tsx";
import {
  getUserDataStatusSelector,
  getUserIsLoggedIn,
  verifyUserTokenAsyncTunk,
} from "./pages/redux/userSlice.ts";
import LoadingPage from "./pages/Loading.tsx";
import LandingPage from "./pages/Landing.tsx";
import Auth from "./pages/Auth.tsx";
import AppNavigation from "./AppNavigation.tsx";

const AppWraper = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyUserTokenAsyncTunk());
  }, []);
  const location = useLocation();
  let userSliceState = useAppSelector(getUserDataStatusSelector);
  let isLoggedIn = useAppSelector(getUserIsLoggedIn);

  return (
    <AnimatePresence mode="wait">
      {userSliceState === "pending" ? (
        <LoadingPage />
      ) : (
        <Routes key={location.pathname} location={location}>
          {isLoggedIn ? (
            <Route path="/" element={<PrimaryLayout />}>
              <Route index path="/" element={<AppNavigation />} />
              <Route path="new" element={<ExpenssForm />} />
              <Route path="editTransaction" element={<ExpenssForm />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<Auth state="signin" />} />
              <Route path="/signup" element={<Auth state="signup" />} />

              <Route path="*" element={<Navigate to={"/"} />} />
            </>
          )}
        </Routes>
      )}
    </AnimatePresence>
  );
};

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <AppWraper />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
