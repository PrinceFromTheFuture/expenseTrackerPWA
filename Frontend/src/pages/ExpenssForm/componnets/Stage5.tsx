import Icon from "@/components/Icon";
import edit_main from "@/assets/edit_main.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { allPaymentMethodsSelector } from "@/redux/paymentMethodsSlice";
import { motion } from "framer-motion";
import generalTransition from "@/lib/generalTransition";
import { formDataSelector, modifyPaymentMethodInForm } from "@/redux/formSlice";
import Touchable from "@/components/Touchable";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/alert-dialog";
import PaymentMethodForm from "@/features/PaymentMethodForm";
import plus_surface from "@/assets/plus_surface.svg";
import exit_main from "@/assets/exit_main.svg";
import { useState } from "react";

const Stage5 = () => {
  const allPaymentMethods = useAppSelector(allPaymentMethodsSelector).filter((paymentMethod) => !paymentMethod.isDeleted);
  const [isNewPaymentMethodDialogOpen, setIsNewPaymentMethodDialogOpen] = useState(false);
  const selctedPaymentMethodId = useAppSelector(formDataSelector).paymentMethodId;
  const dispatch = useAppDispatch();

  return (
    <div className=" w-full h-full my-4 flex flex-col justify-start items-center ">
      {" "}
      <div className="text-secondary mb-4  font-semibold text-base">Payment Method</div>
      <div className=" w-full mb-4 flex justify-between items-end">
        {" "}
        <div className="text-dark   font-semibold text-lg">Payment Methods</div>
        <Icon src={edit_main} varient="mid" />
      </div>
      <div className=" w-full max-h-[60vh] overflow-auto flex flex-col justify-between items-start gap-2">
        {allPaymentMethods.map((paymentMethod) => {
          return (
            <Touchable
              animate={{
                outlineOffset: selctedPaymentMethodId === paymentMethod.id ? "-2px" : "0px",
                outlineWidth: selctedPaymentMethodId === paymentMethod.id ? "2px" : "0px",
              }}
              onClick={() => dispatch(modifyPaymentMethodInForm(paymentMethod.id))}
              key={paymentMethod.id}
              className=" rounded-2xl w-full h-16 p-4 flex  outline-main outline justify-between items-center bg-container"
            >
              <div className=" mr-4">
                {" "}
                <motion.div
                  transition={generalTransition}
                  initial={{
                    backgroundColor: "#9daab0",
                  }}
                  animate={{
                    backgroundColor: selctedPaymentMethodId === paymentMethod.id ? "#0d6680" : "#9daab0",
                  }}
                  className=" flex justify-center  items-center  w-4 h-4 rounded-full "
                >
                  <motion.div
                    transition={generalTransition}
                    animate={{
                      width: selctedPaymentMethodId === paymentMethod.id ? "50%" : "80%",
                      height: selctedPaymentMethodId === paymentMethod.id ? "50%" : "80%",
                    }}
                    className="  bg-container rounded-full"
                  ></motion.div>
                </motion.div>
              </div>
              <div className=" w-full flex justify-between items-center">
                <div className=" text-md text-secondary font-bold">{paymentMethod.name}</div>
                <img src={paymentMethod.iconURL} className=" w-6" />
              </div>
            </Touchable>
          );
        })}
        <AlertDialog open={isNewPaymentMethodDialogOpen} onOpenChange={setIsNewPaymentMethodDialogOpen}>
          <AlertDialogTrigger className=" w-full">
            <Touchable className=" w-full flex justify-center items-center h-14 bg-secondary mb-4 px-4 rounded-2xl">
              <img src={plus_surface} alt="" className=" w-6" />
            </Touchable>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className=" w-full p-4 mx-4 rounded-2xl bg-surface max-h-[65vh] overflow-auto">
              <div onClick={() => setIsNewPaymentMethodDialogOpen(false)}>
                <Icon src={exit_main} varient="mid" />
              </div>
              <PaymentMethodForm
                onSaveAction={() => {
                  setIsNewPaymentMethodDialogOpen(false);
                }}
              />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Stage5;
