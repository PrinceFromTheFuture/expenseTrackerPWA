import { useEffect } from "react";
import getAllDataFromAPI from "./lib/getAllDataFromAPI";
import { useAppDispatch } from "./hooks/hooks";
import { Outlet } from "react-router-dom";

const PrimaryLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllDataFromAPI(dispatch);
  }, []);

  return <Outlet />;
};

export default PrimaryLayout;
