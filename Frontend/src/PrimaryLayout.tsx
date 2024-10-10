import {  useEffect } from "react";
import getAllDataFromAPI from "./lib/getAllDataFromAPI";
import { useAppDispatch } from "./hooks/hooks";
import { Outlet } from "react-router-dom";

const PrimaryLayout = () => {
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
    setTimeout(() => {}, 2000);
    getAllDataFromAPI(dispatch);
  }, []);

  return <Outlet />;
};

export default PrimaryLayout;
