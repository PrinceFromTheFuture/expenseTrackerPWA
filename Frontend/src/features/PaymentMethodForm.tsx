import Touchable from "@/components/Touchable";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import generalTransition from "@/lib/generalTransition";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ILS_symbol_main from "@/assets/ils_symbol_main.svg";
import { AlertDialogPortal } from "@/components/alert-dialog";
import { accountIcons } from "@/lib/icons";

import exit_main from "@/assets/exit_main.svg";
import Icon from "@/components/Icon";
import tag_main from "@/assets/tag_main.svg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IconSelector = ({
  setSelectedIcon,
  setIsDialogOpen,
  selectedIcon,
}: {
  setIsDialogOpen: () => void;
  setSelectedIcon: (path: string) => void;
  selectedIcon: string | null;
}) => {
  return (
    <>
      {" "}
      <AlertDialogPortal>
        <motion.div
          transition={generalTransition}
          initial={{ opacity: 0 }}
          style={{ pointerEvents: "all" }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className=" inset-0  z-50 fixed  overflow-y-auto  bg-black/80 flex justify-center items-center"
        >
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ pointerEvents: "all" }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={generalTransition}
              className=" w-3/4 gap-8 shadow-xl  justify-between  overflow-y-auto   items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface"
            >
              <div className=" w-full">
                <div onClick={setIsDialogOpen}>
                  <Icon src={exit_main} varient="mid" />
                </div>

                <div
                  style={{ pointerEvents: "all" }}
                  className=" max-h-[60vh]   overflow-y-auto w-full  grid grid-cols-4 gap-2 my-4   justify-start "
                >
                  {" "}
                  {accountIcons.map((icon) => {
                    return (
                      <div
                        onClick={() => {
                          setSelectedIcon(icon);
                          setIsDialogOpen();
                        }}
                        key={icon}
                        style={{ backgroundColor: icon === selectedIcon ? "#f0f4f7 " : "#f8fbfd" }}
                        className=" p-4 flex justify-center  items-center transition-all  bg-surface rounded-2xl "
                      >
                        <img src={icon} alt="" className=" w-10 h-10" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AlertDialogPortal>
    </>
  );
};
const PaymentMethodForm = () => {
  const [creditLimit, setCardLimit] = useState(0);
  const [selectedName, setSelectedName] = useState("");
  const mode = "new";
  const [methodTypeIndex, setMethodTypeIndex] = useState(0);
  const handleCardLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 100000000) {
      setCardLimit(Number(e.target.value));
    }
  };
  const [isSelectIconDialogOpen, setIsSelectIconDialogOpen] = useState(false);

  const [selectedIcon, setSelectedIcon] = useState<string>(accountIcons[0]);

  const handleChangeIsSelectIconDialogOpen = () => {
    setIsSelectIconDialogOpen(!isSelectIconDialogOpen);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 25) {
      setSelectedName(e.target.value);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {isSelectIconDialogOpen && (
          <IconSelector setSelectedIcon={setSelectedIcon} setIsDialogOpen={handleChangeIsSelectIconDialogOpen} selectedIcon={selectedIcon} />
        )}
      </AnimatePresence>{" "}
      <div className=" font-semibold text-xl text-dark mt-4 mb-8">{mode === "new" ? "Create new" : "Edit"} payment method</div>
      <div className="text-secondary ml-4   mb-2 font-semibold  text-base  ">payment method type</div>
      <div className=" bg-container p-2 w-full rounded-2xl h-14">
        <div className="relative w-full h-full  flex justify-around items-center text-sm font-semibold text-dark  ">
          <div
            onClick={() => setMethodTypeIndex(0)}
            className={cn(" z-10 h-full w-full flex justify-center items-center ", methodTypeIndex === 0 ? "text-white" : "text-secondary")}
          >
            other
          </div>
          <div
            onClick={() => setMethodTypeIndex(1)}
            className={cn(" z-10 h-full w-full  flex justify-center items-center", methodTypeIndex === 1 ? "text-white" : "text-secondary")}
          >
            credit
          </div>
          <div
            onClick={() => setMethodTypeIndex(2)}
            className={cn(" z-10 h-full w-full flex justify-center items-center", methodTypeIndex === 2 ? "text-white" : "text-secondary")}
          >
            debit
          </div>
          <motion.div
            animate={{ transform: `translate(${methodTypeIndex * 100}%)` }}
            transition={generalTransition}
            className=" left-0 absolute w-1/3  h-full bg-main rounded-2xl  z-0"
          ></motion.div>
        </div>
      </div>
      <div className="text-secondary ml-4 mb-2 font-semibold  text-base  ">set your credit card credit limit</div>
      <label htmlFor="creditLimit">
        <Touchable className={" bg-container p-4  mb-4   gap-3   outline-2  rounded-2xl flex justify-between items-center"}>
          <img className=" w-6 h-6" src={ILS_symbol_main} />
          <div className=" w-full">
            {" "}
            <div className="text-sm  text-main font-bold text-left"> credit limit</div>
            <div className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent">
              {String(formatAmountInAgorot(creditLimit, true))}
            </div>
          </div>
        </Touchable>
      </label>
      <input
        type="number"
        name="creditLimit"
        id="creditLimit"
        className="absolute opacity-0 top-0 left-0 "
        value={creditLimit}
        onChange={handleCardLimitChange}
      />
      <div className="text-secondary  mb-2 font-semibold text-base ">Icon</div>
      <div
        onClick={handleChangeIsSelectIconDialogOpen}
        className=" 
outline-dashed  outline-secondary outline-[3px] -outline-offset-[3px]  bg-container w-14 h-14 flex justify-center items-center  p-3 rounded-2xl"
      >
        <img src={selectedIcon} alt="" className=" w-6" />{" "}
      </div>
      <div className="text-secondary ml-4 mb-2 font-semibold  text-base  ">Choose a budget name</div>
      <Touchable className={" bg-container p-4  mb-4   gap-3   outline-2  rounded-2xl flex justify-between items-center"}>
        <img className=" w-6 h-6" src={tag_main} />
        <div className=" w-full">
          {" "}
          <div className="text-sm  text-main font-bold text-left"> Name</div>
          <input
            type="name"
            value={selectedName ? selectedName : ""}
            onChange={handleNameChange}
            placeholder="Cash, Leumi, Savings..."
            className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent "
          />
        </div>
      </Touchable>
      <div className="text-secondary ml-4 mb-2 font-semibold  text-base  ">link your acount</div>
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="erfdsr">fd</SelectItem>
          <SelectItem value="erdr">g</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentMethodForm;
