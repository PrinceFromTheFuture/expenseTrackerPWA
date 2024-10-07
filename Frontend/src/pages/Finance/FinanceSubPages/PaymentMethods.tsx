import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";
import { type CarouselApi } from "@/components/carousel";
import Card from "@/features/Card";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import ellipsis_secondary from "@/assets/ellipsis_secondary.svg";
import { PaymentMethod } from "@/types";
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

const PaymentMethods = () => {
  const faketest: PaymentMethod[] = [
    {
      accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
      creditLimit: null,
      iconURL: leumi,
      id: "344d#",
      name: "test1",
      resetDate: null,
      type: "other",
      userId: "333",
    },
    {
      accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
      creditLimit: null,
      iconURL: leumi,
      id: "3344d#",
      name: "test2",
      resetDate: null,
      type: "other",
      userId: "333",
    },
    {
      accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
      creditLimit: null,
      iconURL: leumi,
      id: "33f44d#",
      name: "test1",
      resetDate: null,
      type: "other",
      userId: "333",
    },
    {
      accountId: "f3",
      creditLimit: null,
      iconURL: leumi,
      id: "343ds4d#",
      name: "test1",
      resetDate: null,
      type: "other",
      userId: "333",
    },
    {
      accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
      creditLimit: null,
      iconURL: leumi,
      id: "33f44fsd#",
      name: "test1",
      resetDate: null,
      type: "debitCard",
      userId: "333",
    },
    {
      accountId: "f3",
      creditLimit: null,
      iconURL: leumi,
      id: "343ds4d#",
      name: "test1",
      resetDate: null,
      type: "debitCard",
      userId: "333",
    },
    {
      accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
      creditLimit: null,
      iconURL: leumi,
      id: "33f44fsd#",
      name: "test1",
      resetDate: null,
      type: "debitCard",
      userId: "333",
    },
    {
      accountId: "f3",
      creditLimit: null,
      iconURL: leumi,
      id: "343ds4d#",
      name: "test1",
      resetDate: null,
      type: "other",
      userId: "333",
    },
    {
      accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
      creditLimit: null,
      iconURL: leumi,
      id: "33f4d4d#",
      name: "test1",
      resetDate: null,
      type: "other",
      userId: "333",
    },
    {
      accountId: "f3",
      creditLimit: null,
      iconURL: leumi,
      id: "343ds4d#",
      name: "test1",
      resetDate: null,
      type: "other",
      userId: "333",
    },
    {
      accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
      creditLimit: 600000,
      iconURL: leumi,
      id: "343ds4dddd#",
      name: "test1",
      resetDate: 21,
      type: "creditCard",
      userId: "333",
    },
  ];

  const allAccounts = useAppSelector(getAllAccountsSelector);

  const [caruselApi, setCaruselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(1);

  React.useEffect(() => {
    if (!caruselApi) {
      return;
    }
    caruselApi.on("select", () => {
      setActiveSlide(caruselApi.selectedScrollSnap() + 1);
    });
  }, [caruselApi]);

  return (
    <div className=" w-full mt-4">
      <div className="flex justify-between items-start">
        <div className=" text-xl font-semibold mb-2 text-dark ">PaymentMethods</div>
        <img src={ellipsis_secondary} className=" p-1 h-8" alt="" />
      </div>
      <div className=" w-full mb-4 ">
        {" "}
        <Carousel setApi={setCaruselApi} onChange={(e) => console.log(e)} opts={{ loop: false, skipSnaps: true }}>
          <CarouselContent className=" w-full overflow-visible ">
            {faketest
              .filter((paymentMethod) => paymentMethod.type !== "other")
              .map((paymentMethod) => {
                return (
                  <Drawer key={paymentMethod.id}>
                    <CarouselItem className="p-2 py-4 w-full overflow-visible    ">
                      <DrawerTrigger className=" w-full h-full">
                        <Card />
                      </DrawerTrigger>
                    </CarouselItem>
                    <DrawerContent>
                      <div className=" w-full ">
                        <div className=" flex justify-end">
                          <Icon src={ellipsis_secondary} varient="mid" />
                        </div>
                        <div className="mt-4">
                          <Card />
                          <div className=" text-xl font-semibold mb-2 text-dark mt-10 ">Deatils</div>
                          <div className="p-4 border-container border-2  rounded-2xl">
                            {" "}
                            <div className=" flex justify-between items-center mb-2">
                              <div className="text-sm text-secondary text-left font-semibold">linked account</div>
                              <div className="flex justify-start items-center gap-2">
                                <img src={link_dark} className=" w-5" alt="" />
                                <div className="text-sm text-dark text-left font-bold">
                                  {" "}
                                  {allAccounts.find((account) => account.id === paymentMethod.accountId)?.name ||
                                    "error account with the id deosnt exsists"}
                                </div>
                              </div>
                            </div>
                            <div className=" flex justify-between items-center mb-2">
                              <div className="text-sm text-secondary text-left font-semibold">name</div>
                              <div className="text-sm text-dark text-left font-bold"> {paymentMethod.name}</div>
                            </div>
                            {paymentMethod.type === "creditCard" && (
                              <>
                                <div className=" flex justify-between items-center mb-2">
                                  <div className="text-sm text-secondary text-left font-semibold">reset date</div>
                                  <div className="text-sm text-dark text-left font-bold"> {paymentMethod.resetDate}</div>
                                </div>
                                <div className=" flex justify-between items-center ">
                                  <div className="text-sm text-secondary text-left font-semibold">credit limit</div>
                                  <div className="text-sm text-dark text-left font-bold">
                                    {" "}
                                    {formatAmountInAgorot(paymentMethod.creditLimit!, true)}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          <div className=" text-xl font-semibold mb-2 text-dark mt-4 ">Usage</div>
                          <div className=" flex w-full justify-between items-end font-semibold text-base ">
                            <div className=" text-main">{formatAmountInAgorot(400000, true)}</div>
                            <div className=" text-dark">{formatAmountInAgorot(paymentMethod.creditLimit!, true)}</div>
                          </div>
                          <div className=" my-2 relative w-full h-6 rounded-md bg-container overflow-hidden">
                            <motion.div
                              transition={{ delay: 0.25, ...generalTransition }}
                              initial={{ width: "0%" }}
                              animate={{ width: `${(400000 / paymentMethod.creditLimit!) * 100}%` }}
                              className=" absolute h-full rounded-md bg-main left-0"
                            ></motion.div>
                          </div>
                          <div className="font-semibold text-secondary text-sm">{((400000 / paymentMethod.creditLimit!) * 100).toFixed(1)}% used</div>
                        </div>
                        <DrawerClose className=" w-full">
                          <Touchable className=" mt-5 w-full p-4 bg-secondary text-sm font-bold  rounded-2xl text-surface">Close</Touchable>
                        </DrawerClose>
                      </div>
                    </DrawerContent>
                  </Drawer>
                );
              })}
          </CarouselContent>
        </Carousel>
        <div className=" w-full justify-center items-center flex mt-4 gap-2">
          {" "}
          {faketest
            .filter((paymentMethod) => paymentMethod.type !== "other")
            .map((paymentMethod, index) => {
              return (
                <div key={paymentMethod.id} className={cn("  rounded-full w-2 h-2 gap-2", index + 1 === activeSlide ? "bg-dark" : "bg-secondary")} />
              );
            })}
        </div>
      </div>

      <div className=" text-xl font-semibold mb-2 text-dark ">Other</div>
      <div className=" flex flex-col gap-4">
        {faketest
          .filter((paymentMethod) => paymentMethod.type === "other")
          .map((paymentMethod) => {
            return (
              <div key={paymentMethod.id} className=" w-full bg-container rounded-md p-4">
                <div className=" flex justify-between items-center">
                  <div className=" flex gap-2">
                    <img src={paymentMethod.iconURL} className=" w-5" alt="" />
                    <div className="  text-md text-dark font-bold">{paymentMethod.name}</div>
                  </div>
                  <img src={ellipsis_secondary} className=" h-6" />
                </div>
                <div className=" mt-2 flex gap-2">
                  <img src={link_secondary} className=" w-5" alt="" />
                  <div className=" text-secondary text-sm font-semibold">
                    {allAccounts.find((account) => account.id === paymentMethod.accountId)?.name || "error account with the id deosnt exsists"}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PaymentMethods;
