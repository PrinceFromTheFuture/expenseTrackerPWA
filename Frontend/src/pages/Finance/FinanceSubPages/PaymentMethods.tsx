import { Carousel, CarouselContent, CarouselItem } from "@/components/carousel";
import Card from "@/features/Card";
import React from "react";

const PaymentMethods = () => {
  return (
    <div className=" w-full mt-4">
      {" "}
      <div className=" text-xl font-semibold mb-2 text-dark">PaymentMethods</div>
      <div className=" w-full ">
        {" "}
        <Carousel opts={{ loop: false, skipSnaps: true }}>
          <CarouselContent className=" w-full overflow-visible ">
            <CarouselItem className=" w-full overflow-visible  p-4  ">
              <Card />
            </CarouselItem>
            <CarouselItem className=" p-4 overflow-visible   w-full">
              <Card />
            </CarouselItem>
            <CarouselItem className=" p-4  overflow-visible w-full ">
              <Card />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default PaymentMethods;
