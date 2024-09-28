import { ReactNode, useEffect } from "react";
import getAllDataFromAPI from "./lib/getAllDataFromAPI";
import { useAppDispatch } from "./lib/hooks/hooks";
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
    getAllDataFromAPI(dispatch);
  }, []);

  return <Outlet />;
};

export default PrimaryLayout;
