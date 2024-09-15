import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store.ts";
import NewExpenss from "@/newExpenss/NewExpenss.tsx";
import { AnimatePresence } from "framer-motion";

const AppWraper = () => {
  const location = useLocation();

  return (
    <div>
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
