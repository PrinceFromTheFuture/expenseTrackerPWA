import Touchable from "@/components/Touchable";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import generalTransition from "@/lib/generalTransition";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ILS_symbol_main from "@/assets/ils_symbol_main.svg";
import { accountIcons } from "@/lib/icons";

import exit_main from "@/assets/exit_main.svg";
import Icon from "@/components/Icon";
import tag_main from "@/assets/tag_main.svg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getAllAccountsSelector } from "@/redux/accountsSlice";
import link_dark from "@/assets/link_dark.svg";
import { Slider } from "@/components/ui/slider";
import colors from "@/lib/colors";
import {
  allPaymentMethodsSelector,
  getPaymentMethodById,
  postNewPaymentMethodAsyncThunk,
  updatePaymentMethodAsyncThunk,
} from "@/redux/paymentMethodsSlice";
import warning_red from "@/assets/warning_red.svg";
import { PaymentMethodForm as PaymentMethodFormType } from "@/types/types";
import getAllDataFromAPI from "@/lib/getAllDataFromAPI";
import { toast } from "sonner";

const ColorSelector = ({
  setSelectedColor,
  setIsDialogOpen,
  selectedColor,
}: {
  setIsDialogOpen: () => void;
  setSelectedColor: (name: string) => void;
  selectedColor: string;
}) => {
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" inset-0   z-50 fixed bg-black/80 h-full flex justify-center items-center"
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={generalTransition}
          className=" w-3/4 gap-8 shadow-xl pointer-events-auto justify-between  overflow-auto    items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface"
        >
          <div className=" w-full">
            <div onClick={setIsDialogOpen}>
              <Icon src={exit_main} varient="mid" />
            </div>
            <div className="   w-full  grid grid-cols-4 gap-4 my-4   justify-start ">
              {" "}
              {colors.map((color) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedColor(color);
                      setIsDialogOpen();
                    }}
                    key={color}
                    style={{ backgroundColor: color === selectedColor ? "#f0f4f7 " : "#f8fbfd" }}
                    className=" p-2 flex justify-center items-center transition-all  bg-surface rounded-2xl "
                  >
                    <div className=" w-full rounded-2xl aspect-square" style={{ backgroundColor: `#${color}` }}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
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
      <motion.div
        transition={generalTransition}
        initial={{ opacity: 0 }}
        style={{ pointerEvents: "all" }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" inset-0  z-50 fixed  overflow-y-auto  h-full  bg-black/80 flex justify-center items-center"
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

              <div style={{ pointerEvents: "all" }} className=" max-h-[50vh]   overflow-y-auto w-full  grid grid-cols-4 gap-2 my-4   justify-start ">
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
    </>
  );
};
type Props = {
  onSaveAction: () => void;
  paymentMethodId?: string;
};

const PaymentMethodForm = ({ onSaveAction, paymentMethodId }: Props) => {
  const [isSelectIconDialogOpen, setIsSelectIconDialogOpen] = useState(false);
  const [isSelectColorDialogOpen, setIsSelectColorDialogOpen] = useState(false);
  const allPaymentMethods = useAppSelector(allPaymentMethodsSelector);
  const paymentMethod = useAppSelector((state) => getPaymentMethodById(state, paymentMethodId));
  const mode = paymentMethod === undefined ? "new" : "edit";
  // an undefined paymentMethodId will fallback to default mode of new account

  const getPaymentMethodIndexByType = (type: "other" | "creditCard" | "debitCard") => {
    switch (type) {
      case "other":
        return 0;
      case "debitCard":
        return 1;
      case "creditCard":
        return 2;
    }
  };
  const allAccounts = useAppSelector(getAllAccountsSelector).filter((account) => !account.isDeleted);
  const [methodTypeIndex, setMethodTypeIndex] = useState(paymentMethod ? getPaymentMethodIndexByType(paymentMethod.type) : 0);

  const [selectedColor, setSelectedColor] = useState<string>(
    paymentMethod ? colors.find((color) => color === paymentMethod.color) || colors[0] : colors[0]
  );

  const [selectedCreditLimit, setSelectedCreditLimit] = useState(paymentMethod?.creditLimit || 0);
  const [selectedLinkedAccountId, setSelectedLinkedAccountId] = useState(paymentMethod?.accountId || allAccounts[0].id);
  const [selectedName, setSelectedName] = useState(paymentMethod?.name || null);
  const [selectedIcon, setSelectedIcon] = useState<string>(paymentMethod?.iconURL || accountIcons[0]);
  const [selectedCardResetDay, setSelectedCardResetDay] = useState(paymentMethod?.resetDate || 1);

  const handleCardLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 100000000) {
      setSelectedCreditLimit(Number(e.target.value));
    }
  };
  const handleChangeIsSelectIconDialogOpen = () => {
    setIsSelectIconDialogOpen(!isSelectIconDialogOpen);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 25) {
      setSelectedName(e.target.value);
    }
  };
  const handleChangeIsSelectColorDialogOpen = () => {
    setIsSelectColorDialogOpen(!isSelectColorDialogOpen);
  };
  const dispatch = useAppDispatch();

  const onSave = async () => {
    if (selectedName === "" || selectedName === null || !selectedIcon || !selectedLinkedAccountId) {
      return;
    }
    if (methodTypeIndex === 1 && !selectedColor) {
      return;
    }
    if (methodTypeIndex === 2 && (!selectedCreditLimit || !selectedCardResetDay)) {
      return;
    }
    onSaveAction();
    if (allPaymentMethods.filter((paymentMethod) => !paymentMethod.isDeleted).length > 7) {
      toast("you cannot have more than 8 payment methods", { icon: <img src={warning_red} alt="" /> });
      return;
    }

    const filledForm: Omit<PaymentMethodFormType, "id"> = {
      accountId: selectedLinkedAccountId,
      name: selectedName,
      color: selectedColor,
      creditLimit: selectedCreditLimit,
      iconURL: selectedIcon,
      resetDate: selectedCardResetDay,
      type: methodTypeIndex === 0 ? "other" : methodTypeIndex === 1 ? "debitCard" : "creditCard",
    };

    if (mode === "new") {
      await dispatch(postNewPaymentMethodAsyncThunk({ ...filledForm }));
    } else {
      await dispatch(updatePaymentMethodAsyncThunk({ ...filledForm, id: paymentMethodId! }));
    }
    getAllDataFromAPI(dispatch);
  };

  return (
    <div>
      <AnimatePresence>
        {isSelectIconDialogOpen && (
          <IconSelector setSelectedIcon={setSelectedIcon} setIsDialogOpen={handleChangeIsSelectIconDialogOpen} selectedIcon={selectedIcon} />
        )}
      </AnimatePresence>{" "}
      <AnimatePresence>
        {isSelectColorDialogOpen && (
          <ColorSelector setIsDialogOpen={handleChangeIsSelectColorDialogOpen} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        )}
      </AnimatePresence>
      <div className="  font-semibold text-xl text-dark mt-4 ">{mode === "new" ? "Create new" : "Edit"} payment method</div>
      <div className=" mb-8 mt-2 bg-container p-2 w-full rounded-2xl h-14">
        <div className="relative w-full h-full  flex justify-around items-center text-sm font-semibold text-dark  ">
          <div
            onClick={() => setMethodTypeIndex(0)}
            className={cn(" z-10 h-full w-full flex justify-center items-center ", methodTypeIndex === 0 ? "text-white" : "text-secondary")}
          >
            other
          </div>
          <div
            onClick={() => setMethodTypeIndex(1)}
            className={cn(" z-10 h-full w-full flex justify-center items-center", methodTypeIndex === 1 ? "text-white" : "text-secondary")}
          >
            debit
          </div>
          <div
            onClick={() => setMethodTypeIndex(2)}
            className={cn(" z-10 h-full w-full  flex justify-center items-center", methodTypeIndex === 2 ? "text-white" : "text-secondary")}
          >
            credit
          </div>
          <motion.div
            animate={{ transform: `translate(${methodTypeIndex * 100}%)` }}
            transition={generalTransition}
            className=" left-0 absolute w-1/3  h-full bg-main rounded-2xl  z-0"
          ></motion.div>
        </div>
      </div>
      <div className=" flex flex-col justify-start items-start gap-6">
        <section className=" w-full">
          <div className="text-secondary ml-4 mb-2 font-semibold  text-base  ">Choose a budget name</div>
          <Touchable className={" bg-container p-4   gap-3   outline-2  rounded-2xl flex justify-between items-center"}>
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
        </section>
        <section className=" w-full">
          <div className="text-secondary  font-semibold text-base ">Icon</div>
          <div
            onClick={handleChangeIsSelectIconDialogOpen}
            className=" 
outline-dashed  outline-secondary outline-[3px] -outline-offset-[3px]  bg-container w-14 h-14 flex justify-center items-center  p-3 rounded-2xl"
          >
            <img src={selectedIcon} alt="" className=" w-6" />{" "}
          </div>
        </section>
        <section className=" w-full">
          <div className="text-secondary mb-2  font-semibold  text-base  ">link your acount</div>
          <Select defaultValue={selectedLinkedAccountId} onValueChange={(selectedValue) => setSelectedLinkedAccountId(selectedValue)}>
            <SelectTrigger>
              <img src={link_dark} className=" w-5  mx-1 text-" alt="" />
              <SelectValue className=" placeholder:text-secondary" placeholder="choose account" />
            </SelectTrigger>
            <SelectContent>
              {allAccounts.map((account) => {
                return <SelectItem value={account.id}>{account.name}</SelectItem>;
              })}
            </SelectContent>
          </Select>
        </section>
        {methodTypeIndex !== 0 && (
          <>
            <section className=" w-full">
              <div className="text-secondary   mb-2 font-semibold text-base ">Color</div>
              <div
                onClick={handleChangeIsSelectColorDialogOpen}
                style={{ backgroundColor: `#${selectedColor}` }}
                className="
   w-full h-14 flex justify-center shadow-sm items-center  p-3 rounded-2xl"
              ></div>
            </section>
            {methodTypeIndex === 2 && (
              <>
                <section className=" w-full">
                  <div className="text-secondary ml-4 mb-2 font-semibold  text-base  ">set your credit card credit limit</div>
                  <label htmlFor="creditLimit">
                    <Touchable className={" bg-container p-4   gap-3   outline-2  rounded-2xl flex justify-between items-center"}>
                      <img className=" w-6 h-6" src={ILS_symbol_main} />
                      <div className=" w-full">
                        {" "}
                        <div className="text-sm  text-main font-bold text-left"> credit limit</div>
                        <div className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent">
                          <div className=" relative">
                            <input
                              type="number"
                              name="creditLimit"
                              id="creditLimit"
                              className="absolute opacity-0  top-0 left-0 "
                              value={selectedCreditLimit}
                              onChange={handleCardLimitChange}
                            />
                          </div>
                          {String(formatAmountInAgorot(selectedCreditLimit, true))}
                        </div>
                      </div>
                    </Touchable>
                  </label>
                </section>
                <section className=" w-full">
                  <div className="text-secondary mb-4 font-semibold  text-base  ">credit reset date {selectedCardResetDay}</div>
                  <Slider
                    onValueChange={(value) => {
                      const [newDay] = value;
                      setSelectedCardResetDay(newDay);
                    }}
                    defaultValue={[selectedCardResetDay]}
                    step={1}
                    max={28}
                  ></Slider>
                </section>
              </>
            )}
          </>
        )}
        <Touchable onClick={onSave} className=" mt-5 w-full p-4 bg-main text-sm font-bold justify-center flex  rounded-2xl text-surface">
          Save
        </Touchable>
      </div>
    </div>
  );
};

export default PaymentMethodForm;
