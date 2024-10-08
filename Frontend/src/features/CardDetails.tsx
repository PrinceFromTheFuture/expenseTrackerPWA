import Card from "@/components/Card";
import { CarouselItem } from "@/components/carousel";
import { Drawer, DrawerClose, DrawerContent, DrawerPortal, DrawerTrigger } from "@/components/drawer";
import Icon from "@/components/Icon";
import { PaymentMethod } from "@/types/types";
import React, { useState } from "react";
import ellipsis_secondary from "@/assets/ellipsis_secondary.svg";
import link_dark from "@/assets/link_dark.svg";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import generalTransition from "@/lib/generalTransition";
import { AnimatePresence, motion } from "framer-motion";
import { getAllAccountsSelector } from "@/redux/accountsSlice";
import { useAppSelector } from "@/hooks/hooks";
import Touchable from "@/components/Touchable";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/alert-dialog";
import DeleteWarning from "./DeleteWarning";
import exit_main from "@/assets/exit_main.svg";
import PaymentMethodForm from "./PaymentMethodForm";

const CardActionsDialogProvider = ({
  children,
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <DrawerPortal>
      {isDialogOpen && (
        <AnimatePresence>
          <motion.div
            transition={generalTransition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" inset-0  z-50 fixed bg-black/40 flex justify-center items-center"
          >
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={generalTransition}
                className=" w-full shadow-xl justify-between pointer-events-auto  items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface"
              >
                <div className=" w-full">
                  <div
                    onClick={() => {
                      setIsDialogOpen(false);
                    }}
                  >
                    <Icon src={exit_main} varient="mid" />
                  </div>
                </div>
                <div className=" w-full">{children}</div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </DrawerPortal>
  );
};
interface Props {
  paymentMethod: PaymentMethod;
}
const CardDetails = ({ paymentMethod }: Props) => {
  const allAccounts = useAppSelector(getAllAccountsSelector);
  const [isDeletedialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const onConfirmDelete = () => {};

  return (
    <Drawer dismissible={false} key={paymentMethod.id}>
      <CarouselItem className="p-2 py-4 w-full overflow-visible    ">
        <CardActionsDialogProvider
          children={<DeleteWarning onConfirmDelete={() => onConfirmDelete()} onCancel={() => setIsDeleteDialogOpen(false)} />}
          isDialogOpen={isDeletedialogOpen}
          setIsDialogOpen={setIsDeleteDialogOpen}
        />
        <CardActionsDialogProvider
          children={
            <PaymentMethodForm
              onSaveAction={() => {
                setIsEditDialogOpen(false);
              }}
            />
          }
          isDialogOpen={isEditDialogOpen}
          setIsDialogOpen={setIsEditDialogOpen}
        />
        <DrawerTrigger className=" w-full h-full">
          <Card />
        </DrawerTrigger>
      </CarouselItem>
      <DrawerContent>
        <div className=" w-full ">
          <div className=" flex justify-end">
            <Popover modal={true}>
              <PopoverTrigger>
                <div className=" ">
                  <Icon src={ellipsis_secondary} varient="mid" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={-40}
                align="end"
                side="bottom"
                className=" flex flex-col justify-start items-start font-semibold overflow-hidden text-secondary"
              >
                <Touchable onClick={() => setIsEditDialogOpen(true)} className=" p-6 pl-4 w-full py-2 ">
                  Edit
                </Touchable>

                <Touchable onClick={() => setIsDeleteDialogOpen(true)} className=" p-6 pl-4 py-2">
                  Delete
                </Touchable>
              </PopoverContent>
            </Popover>
          </div>
          <div className="mt-4">
            <Card />
            <div className=" text-xl font-semibold mb-2 text-dark mt-10 ">Deatils</div>
            <div className="p-4 border-container border-2  rounded-2xl flex flex-col justify-between gap-2">
              {" "}
              <div className=" flex justify-between items-center ">
                <div className="text-sm text-secondary text-left font-semibold">linked account</div>
                <div className="flex justify-start items-center gap-2">
                  <img src={link_dark} className=" w-5" alt="" />
                  <div className="text-sm text-dark text-left font-bold">
                    {" "}
                    {allAccounts.find((account) => account.id === paymentMethod.accountId)?.name || "error account with the id deosnt exsists"}
                  </div>
                </div>
              </div>
              <div className=" flex justify-between items-center ">
                <div className="text-sm text-secondary text-left font-semibold">name</div>
                <div className="text-sm text-dark text-left font-bold"> {paymentMethod.name}</div>
              </div>
              {paymentMethod.type === "creditCard" && (
                <>
                  <div className=" flex justify-between items-center ">
                    <div className="text-sm text-secondary text-left font-semibold">reset date</div>
                    <div className="text-sm text-dark text-left font-bold"> {paymentMethod.resetDate}</div>
                  </div>
                  <div className=" flex justify-between items-center ">
                    <div className="text-sm text-secondary text-left font-semibold">credit limit</div>
                    <div className="text-sm text-dark text-left font-bold"> {formatAmountInAgorot(paymentMethod.creditLimit!, true)}</div>
                  </div>
                </>
              )}
            </div>
            {paymentMethod.type === "creditCard" && (
              <>
                {" "}
                <div className=" text-xl font-semibold mb-2 text-dark mt-4 ">Usage</div>
                <div className=" flex w-full justify-between items-end font-bold text-base ">
                  <div className=" text-main">{formatAmountInAgorot(400000, true)}</div>
                  <div className=" text-dark">{formatAmountInAgorot(paymentMethod.creditLimit!, true)}</div>
                </div>
                <div className=" my-2 relative w-full h-6 rounded-md bg-container overflow-hidden">
                  <motion.div
                    transition={{ delay: 0.2, ...generalTransition, duration: 0.5 }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${(400000 / paymentMethod.creditLimit!) * 100}%` }}
                    className=" absolute h-full rounded-md bg-main left-0"
                  ></motion.div>
                </div>
                <div className="font-semibold text-secondary text-sm">{((400000 / paymentMethod.creditLimit!) * 100).toFixed(1)}% used</div>
              </>
            )}
          </div>
        </div>
        <DrawerClose className=" w-full">
          <Touchable className=" mt-5 w-full p-4 bg-secondary text-sm font-bold  rounded-2xl text-surface">Close</Touchable>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default CardDetails;
