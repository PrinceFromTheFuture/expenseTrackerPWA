import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.tsx";
import "./index.css";

import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store.ts";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "./lib/hooks/hooks.ts";
import getAllDataFromAPI from "./lib/getAllDataFromAPI.ts";
import ExpenssForm from "./pages/ExpenssForm/ExpenssForm.tsx";
import PrimaryLayout from "./PrimaryLayout.tsx";
import { getUserDataStatusSelector, getUserIdSelector, verifyUserTokenAsyncTunk } from "./redux/userSlice.ts";
import LoadingPage from "./pages/LoadingPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";

const AppWraper = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(verifyUserTokenAsyncTunk());
    }, 1000);
  }, []);
  const location = useLocation();
  let userSliceState = useAppSelector(getUserDataStatusSelector);
  let userId = useAppSelector(getUserIdSelector);

  return (
    <AnimatePresence mode="wait">
      {userSliceState === "pending" ? (
        <LoadingPage value="Test" />
      ) : (
        <Routes key={location.pathname} location={location}>
          {userId ? (
            <Route path="/" element={<PrimaryLayout />}>
              <Route index element={<Home />} />
              <Route path="new" element={<ExpenssForm />} />
              <Route path="editTransaction" element={<ExpenssForm />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />

              <Route path="/login" element={<div>fd </div>} />
              <Route path="/signup" element={<div>fd </div>} />

              <Route path="*" element={<Navigate to={"/"} />} />
            </>
          )}
        </Routes>
      )}
    </AnimatePresence>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppWraper />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
