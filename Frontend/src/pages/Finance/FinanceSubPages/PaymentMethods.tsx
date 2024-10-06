import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";
import { type CarouselApi } from "@/components/carousel";
import Card from "@/features/Card";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import ellipsis_secondary from "@/assets/ellipsis_secondary.svg";
import { PaymentMethod } from "@/types";
import leumi from "@/assets/accountsIcons/leumi.svg";
import link_secondary from "@/assets/link_secondary.svg";
import { motion } from "framer-motion";
import { useAppSelector } from "@/hooks/hooks";
import { getAllAccountsSelector } from "@/redux/accountsSlice";
import { Link, useNavigate } from "react-router-dom";

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
    { accountId: "f3", creditLimit: null, iconURL: leumi, id: "343ds4d#", name: "test1", resetDate: null, type: "other", userId: "333" },
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
    { accountId: "f3", creditLimit: null, iconURL: leumi, id: "343ds4d#", name: "test1", resetDate: null, type: "debitCard", userId: "333" },
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
    { accountId: "f3", creditLimit: null, iconURL: leumi, id: "343ds4d#", name: "test1", resetDate: null, type: "other", userId: "333" },
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
    { accountId: "f3", creditLimit: null, iconURL: leumi, id: "343ds4d#", name: "test1", resetDate: null, type: "other", userId: "333" },
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
  const navigate = useNavigate();

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
                  <CarouselItem onClick={() => navigate(`/card/${paymentMethod.id}`)} className="p-2 py-4 w-full overflow-visible    ">
                    <Card />
                  </CarouselItem>
                );
              })}
          </CarouselContent>
        </Carousel>
        <div className=" w-full justify-center items-center flex mt-4 gap-2">
          {" "}
          {Array.from([1, 2, 3], (val) => {
            return <div className={cn("  rounded-full w-2 h-2 gap-2", val === activeSlide ? "bg-dark" : "bg-secondary")} />;
          })}
        </div>
      </div>

      <div className=" text-xl font-semibold mb-2 text-dark ">Other</div>
      <div className=" flex flex-col gap-4">
        {faketest
          .filter((paymentMethod) => paymentMethod.type === "other")
          .map((paymentMethod) => {
            return (
              <div className=" w-full bg-container rounded-md p-4">
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
