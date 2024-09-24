import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store.ts";
import NewExpenss from "@/newExpenss/NewExpenss.tsx";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch } from "./hooks.ts";
import getAllDataFromAPI from "./lib/getAllDataFromAPI.ts";

const AppWraper = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleViablityChange = () => {
    getAllDataFromAPI(dispatch);
  };
  useEffect(() => {
    document.addEventListener("visibilitychange", handleViablityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleViablityChange);
    };
  }, []);

  useEffect(() => {
    getAllDataFromAPI(dispatch);
  }, []);
  useEffect(() => {
    // Disable context menu for all links and images
    const disableContextMenu = (event: { preventDefault: () => void }) => event.preventDefault();

    const links = document.querySelectorAll("a");
    const images = document.querySelectorAll("img");

    links.forEach((link) => link.addEventListener("contextmenu", disableContextMenu));
    images.forEach((image) => image.addEventListener("contextmenu", disableContextMenu));

    // Cleanup event listeners on component unmount
    return () => {
      links.forEach((link) => link.removeEventListener("contextmenu", disableContextMenu));
      images.forEach((image) => image.removeEventListener("contextmenu", disableContextMenu));
    };
  }, []);
  return (
    <div className="">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<App />} />
          <Route path="/new" element={<NewExpenss />} />
        </Routes>
      </AnimatePresence>
    </div>
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
