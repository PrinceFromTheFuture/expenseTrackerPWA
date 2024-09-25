import React from "react";

const ReviewBeforeSubmit = () => {
  return (
    <AlertDialog
      open={isReviewBeforeSubmitOpen}
      onOpenChange={(isOpen) => {
        if (
          currentStage === 4 &&
          formData.budgetId &&
          formData.paymentMethodId &&
          formData.amountInAgorot !== 0
        ) {
          setIsReviewBeforeSubmitOpen(isOpen);
        }
      }}
    >
      <AlertDialogTrigger className=" w-full">
        {" "}
        <Touchable
          onClick={handleNextStage}
          className=" w-full bg-main  gap-2  p-4 rounded-2xl flex justify-center items-center font-bold text-md  text-surface"
        >
          <div>{currentStage !== 4 ? "Next" : "Submit"}</div>
          <AnimatePresence>
            {currentStage === 4 && (
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={generalTransition}
                src={paper_plane_surface}
                className=" w-4"
              />
            )}
          </AnimatePresence>
        </Touchable>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className=" w-full gap-8 justify-between items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface">
          <div className=" w-full">
            <AlertDialogCancel>
              <Icon src={exit_main} varient="mid" />
            </AlertDialogCancel>
          </div>
          <div className=" w-full  flex flex-col justify-center items-center ">
            <div className=" text-xl mb-2 text-dark font-bold">Confirm Details!</div>
          </div>
          <div className=" w-full ">
            {" "}
            <Touchable className=" mb-5 w-full bg-container rounded-lg p-4 flex justify-between items-center">
              <div className=" flex justify-start items-center gap-2 ">
                <Icon varient="full" src={facebookTest} />
                <div>
                  <div className=" text-sm font-bold">{displayFormDataTitle}</div>
                  <div className=" text-xs text-secondary text-left font-semibold">{formDataBudgetName}</div>
                </div>
              </div>
            </Touchable>
            <div className=" mx-2">
              <div className="  flex mb-5 justify-between items-center w-full">
                <div className="text-sm text-secondary text-left font-semibold">date and time</div>
                <div className="text-sm text-dark text-left font-bold">
                  {dayjs(formData.date).format("DD.MM.YYYY HH:mm")}
                </div>
              </div>
              <div className=" flex mb-5 justify-between items-center w-full">
                <div className="text-sm text-secondary text-left font-semibold">expenses title</div>
                <div className="text-sm text-dark text-left font-bold">{displayFormDataTitle}</div>
              </div>
              <div className=" flex mb-5 justify-between items-center w-full">
                <div className="text-sm text-secondary text-left font-semibold">budget category</div>
                <div className="text-sm text-dark text-left font-bold">{formDataBudgetName}</div>
              </div>
              <div className=" flex mb-3 justify-between items-center w-full">
                <div className="text-sm text-secondary text-left font-semibold">payment method</div>
                <div className="text-sm text-dark text-left font-bold">{formDatePaymentMethodName}</div>
              </div>
              <svg
                className=" mb-3 w-full px-1"
                width="829"
                height="10"
                viewBox="0 0 829 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="2.62268e-07"
                  y1="3"
                  x2="829"
                  y2="4.00007"
                  stroke="#BECDD5"
                  stroke-width="7"
                  stroke-dasharray="12 12"
                />
              </svg>
              <div className=" flex justify-between items-center w-full">
                <div className="text-sm text-secondary text-left font-semibold">total amount</div>
                <div className="text-sm text-dark text-left font-bold">
                  {formatAmountInAgorot(formData.amountInAgorot, true)}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full justify-between flex items-center gap-2">
            <AlertDialogCancel className=" w-full ">
              <Touchable className=" w-full bg-container rounded-2xl font-semibold text-secondary p-4">
                Cancel
              </Touchable>
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className=" w-full ">
              <Touchable className=" flex justify-center items-center gap-2 w-full bg-main rounded-2xl font-semibold text-surface p-4">
                <div>Submit</div>
                <motion.img
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={generalTransition}
                  src={paper_plane_surface}
                  className=" w-4"
                />
              </Touchable>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReviewBeforeSubmit;
