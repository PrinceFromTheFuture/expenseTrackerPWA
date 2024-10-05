import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";
import Card from "@/features/Card";
import React from "react";

const PaymentMethods = () => {
  return (
    <div className=" w-full mt-4">
      {" "}
      <div className=" text-xl font-semibold mb-2 text-dark">PaymentMethods</div>
      <Carousel opts={{ align: "start", loop: false, skipSnaps: true }}>
        <CarouselContent className=" overflow-visible">
          <CarouselItem className="  p-4  ">
            <Card />
          </CarouselItem>
          <CarouselItem className=" p-4  ">
            <Card />
          </CarouselItem>
          <CarouselItem className=" p-4  ">
            <Card />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PaymentMethods;
