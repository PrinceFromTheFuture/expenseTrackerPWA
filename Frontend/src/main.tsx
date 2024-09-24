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
    const disableContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
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
