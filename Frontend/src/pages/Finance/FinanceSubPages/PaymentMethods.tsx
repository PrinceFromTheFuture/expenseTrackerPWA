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
            <CarouselItem className="p-2 w-full overflow-visible    ">
              <Card />
            </CarouselItem>
            <CarouselItem className=" p-2 overflow-visible   w-full">
              <Card />
            </CarouselItem>
            <CarouselItem className=" p-2  overflow-visible w-full ">
              <Card />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default PaymentMethods;
