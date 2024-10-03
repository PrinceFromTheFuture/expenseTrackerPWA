import Icon from "@/components/ui/Icon";
import React from "react";
import ellipsis_main from "@/assets/ellipsis_main.svg";
import Touchable from "@/components/ui/generalComponents/Touchable";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import { useAppSelector } from "@/lib/hooks/hooks";

const Accounts = () => {
  const allAcounts = useAppSelector(getAllAccountsSelector);
  return (
    <div className=" w-full mt-4">
      <div className=" mb-8">
        {" "}
        <div className=" w-full flex justify-end">
          <Touchable className=" w-10 h-10 bg-container rounded-2xl flex justify-center items-center">
            <img src={ellipsis_main} alt="" className="  h-6" />
          </Touchable>
        </div>
        <div className=" flex justify-center flex-col items-center mt-2">
          {" "}
          <div className=" text-secondary font-semibold">current blanace</div>
          <div className=" text-4xl text-dark font-extrabold mb-2">{formatAmountInAgorot(3243434 || 0, true)}</div>
          <div className=" bg-success/10 rounded-lg p-1 px-4 text-xs   text-left font-semibold text-success">1234.34 (124.24%)</div>
        </div>
      </div>
      <div className=" text-xl font-semibold mb-2 text-dark">Accoutns</div>
      <div></div>
    </div>
  );
};

export default Accounts;
