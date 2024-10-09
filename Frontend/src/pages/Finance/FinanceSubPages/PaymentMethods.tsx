import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";
import { type CarouselApi } from "@/components/carousel";
import Card from "@/components/Card";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import ellipsis_secondary from "@/assets/ellipsis_secondary.svg";
import { PaymentMethod } from "@/types/types";
import leumi from "@/assets/accountsIcons/leumi.svg";
import link_secondary from "@/assets/link_secondary.svg";
import link_dark from "@/assets/link_dark.svg";
import { motion } from "framer-motion";
import { useAppSelector } from "@/hooks/hooks";
import { getAllAccountsSelector } from "@/redux/accountsSlice";
import { Link, useNavigate } from "react-router-dom";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/drawer";
import Icon from "@/components/Icon";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import generalTransition from "@/lib/generalTransition";
import Touchable from "@/components/Touchable";
import CardDetails from "@/features/CardDetails";
import { allPaymentMethodsSelector } from "@/redux/paymentMethodsSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { AlertDialogContent, AlertDialogTrigger } from "@/components/alert-dialog";
import PaymentMethodForm from "@/features/PaymentMethodForm";
import plus_surface from "@/assets/plus_surface.svg";

const PaymentMethods = () => {
  const paymentMethods = useAppSelector(allPaymentMethodsSelector);

  const allAccounts = useAppSelector(getAllAccountsSelector);

  const [caruselApi, setCaruselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(1);
  const [isNewPaymentMethodDialogOpen, setIsNewPaymentMethodDialogOpen] = useState(false);
  React.useEffect(() => {
    if (!caruselApi) {
      return;
    }
    caruselApi.on("select", () => {
      setActiveSlide(caruselApi.selectedScrollSnap() + 1);
    });
  }, [caruselApi]);

  return (
    <div className=" w-full mt-4 ">
      <div className="flex justify-between items-start">
        <div className=" text-xl font-semibold mb-2 text-dark ">PaymentMethods</div>
        <img src={ellipsis_secondary} className=" p-1 h-8" alt="" />
      </div>
      <div className=" w-full mb-4 ">
        {" "}
        <Carousel setApi={setCaruselApi} opts={{ loop: false, skipSnaps: true }}>
          <CarouselContent className=" w-full overflow-visible ">
            {paymentMethods
              .filter((paymentMethod) => paymentMethod.type !== "other")
              .map((paymentMethod) => {
                return <CardDetails paymentMethod={paymentMethod} />;
              })}
          </CarouselContent>
        </Carousel>
        <div className=" w-full justify-center items-center flex mt-4 gap-2">
          {" "}
          {paymentMethods
            .filter((paymentMethod) => paymentMethod.type !== "other")
            .map((paymentMethod, index) => {
              return (
                <div
                  key={paymentMethod.id}
                  className={cn(
                    "  rounded-full w-2 h-2 gap-2",
                    index + 1 === activeSlide ? "bg-dark" : "bg-secondary"
                  )}
                />
              );
            })}
        </div>
      </div>

      <div className=" text-xl font-semibold mb-2 text-dark ">Other</div>
      <div className=" flex flex-col gap-4">
        {paymentMethods
          .filter((paymentMethod) => paymentMethod.type === "other")
          .map((paymentMethod) => {
            return (
              <div key={paymentMethod.id} className=" w-full bg-container rounded-md p-4">
                <div className=" flex justify-between items-center">
                  <div className=" flex gap-2">
                    <img src={paymentMethod.iconURL} className=" w-5" alt="" />
                    <div className="  text-md text-dark font-bold">{paymentMethod.name}</div>
                  </div>
                  <Popover modal={true}>
                    <PopoverTrigger>
                      <img src={ellipsis_secondary} className=" h-6" />
                    </PopoverTrigger>
                    <PopoverContent
                      sideOffset={-40}
                      align="end"
                      side="bottom"
                      className=" flex flex-col justify-start items-start font-semibold overflow-hidden text-secondary"
                    >
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Touchable className=" p-6 pl-4 w-full py-2 ">Edit</Touchable>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <PaymentMethodForm paymentMethodId={paymentMethod.id} onSaveAction={() => {}} />
                        </AlertDialogContent>
                      </AlertDialog>

                      <Touchable onClick={() => {}} className=" p-6 pl-4 py-2">
                        Delete
                      </Touchable>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className=" mt-2 flex gap-2">
                  <img src={link_secondary} className=" w-5" alt="" />
                  <div className=" text-secondary text-sm font-semibold">
                    {allAccounts.find((account) => account.id === paymentMethod.accountId)?.name ||
                      "error account with the id deosnt exsists"}
                  </div>
                </div>
              </div>
            );
          })}
        <AlertDialog open={isNewPaymentMethodDialogOpen} onOpenChange={setIsNewPaymentMethodDialogOpen}>
          <AlertDialogTrigger>
            <Touchable className=" w-full flex justify-center items-center h-14 bg-secondary mb-4 px-4 rounded-2xl">
              <img src={plus_surface} alt="" className=" w-6" />
            </Touchable>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className=" w-full p-4 mx-4 rounded-2xl bg-surface max-h-[65vh] overflow-auto">
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

export default PaymentMethods;
