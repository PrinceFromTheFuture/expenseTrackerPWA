import CircleGraph from "@/features/CircleGraph";
import React from "react";

const Statistics = () => {
  return (
    <div className=" w-full fixed  top-0 bottom-0 left-0 right-0 overflow-y-auto overflow-x-hidden bg-surface py-4">
      <div className="font-bold text-dark text-lg">Finance</div>
      <div className=" mx-4  border-container border-2 rounded-2xl flex p-4 justify-center items-center flex-col">
        <CircleGraph
          data={[
            { amount: 100, color: "#78B577", id: "324" },
            { amount: 200, color: "#9E80B5", id: "3244" },
          ]}
          roundness={8}
          segmentBorderWidth={5}
          segmentWidth={30}
          size={200}
        />
      </div>
    </div>
  );
};

export default Statistics;
