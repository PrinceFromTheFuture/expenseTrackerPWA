const ExpensesWidgetSkeleton = () => {
  return (
    <div className=" mb-2 w-full animate-pulse bg-dark/10 rounded-2xl h-16 flex justify-between items-center p-4">
      {" "}
      <div className=" flex justify-between items-start gap-2">
        {" "}
        <div className=" w-10 h-10 rounded-lg bg-dark/15 animate-pulse"> </div>
        <div>
          {" "}
          <div className=" w-24  mb-2 bg-dark/10 animate-pulse h-4 rounded-md"></div>
          <div className=" w-40  bg-dark/5 animate-pulse h-3 rounded-md"></div>
        </div>
      </div>
      <div className="w-24  bg-dark/15 animate-pulse h-5 rounded-md"></div>
    </div>
  );
};

export default ExpensesWidgetSkeleton;
