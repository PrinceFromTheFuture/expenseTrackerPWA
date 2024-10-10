import { Carousel, CarouselContent,  } from "@/components/carousel";
import { type CarouselApi } from "@/components/carousel";
import Card from "@/components/Card";
import { cn } from "@/lib/utils";
import React, {  useState } from "react";
import ellipsis_secondary from "@/assets/ellipsis_secondary.svg";
import link_secondary from "@/assets/link_secondary.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getAllAccountsSelector } from "@/redux/accountsSlice";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import Icon from "@/components/Icon";
import Touchable from "@/components/Touchable";
import CardDetails from "@/features/CardDetails";
import { allPaymentMethodsSelector, deletePaymentMethodByIdAsyncThunk, getPaymentMethodsDataStatusSelector } from "@/redux/paymentMethodsSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { AlertDialogContent, AlertDialogTrigger } from "@/components/alert-dialog";
import PaymentMethodForm from "@/features/PaymentMethodForm";
import plus_surface from "@/assets/plus_surface.svg";
import getAllDataFromAPI from "@/lib/getAllDataFromAPI";
import DeleteWarning from "@/features/DeleteWarning";
import exit_main from "@/assets/exit_main.svg";
import { Skeleton } from "@/components/skeleton";

const PaymentMethods = () => {
  const paymentMethods = useAppSelector(allPaymentMethodsSelector).filter((paymentMethod) => !paymentMethod.isDeleted);
  const dispatch = useAppDispatch();
  const allAccounts = useAppSelector(getAllAccountsSelector).filter((account) => !account.isDeleted);
  const paymentMethodsStatus = useAppSelector(getPaymentMethodsDataStatusSelector);

  const [caruselApi, setCaruselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(1);
  const [isNewPaymentMethodDialogOpen, setIsNewPaymentMethodDialogOpen] = useState(false);
  const [IsDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  React.useEffect(() => {
    if (!caruselApi) {
      return;
    }
    caruselApi.on("select", () => {
      setActiveSlide(caruselApi.selectedScrollSnap() + 1);
    });
  }, [caruselApi]);
  const onConfirmDelete = async (id: string) => {
    await dispatch(deletePaymentMethodByIdAsyncThunk(id));
    getAllDataFromAPI(dispatch);
  };

  return (
    <div className=" w-full mt-4 ">
      <div className=" w-full mb-4 ">
        <Carousel setApi={setCaruselApi} opts={{ loop: false, skipSnaps: true }}>
          <CarouselContent className=" w-full overflow-visible ">
            {paymentMethodsStatus === "success" ? (
              paymentMethods
                .filter((paymentMethod) => paymentMethod.type !== "other")
                .map((paymentMethod) => {
                  return <CardDetails paymentMethod={paymentMethod} />;
                })
            ) : (
              <Card isPending />
            )}
          </CarouselContent>
        </Carousel>
        <div className=" w-full justify-center items-center flex mt-4 gap-2">
          {paymentMethods
            .filter((paymentMethod) => paymentMethod.type !== "other")
            .map((paymentMethod, index) => {
              return (
                <div key={paymentMethod.id} className={cn("  rounded-full w-2 h-2 gap-2", index + 1 === activeSlide ? "bg-dark" : "bg-secondary")} />
              );
            })}
        </div>
      </div>

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
      <div className=" text-secondary mb-2 font-semibold text-base ">Other</div>
      <div className=" flex flex-col gap-4 mb-24">
        {paymentMethodsStatus === "success" ? (
          paymentMethods
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
                        <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <AlertDialogTrigger className=" w-full">
                            <Touchable className="  p-6 pl-4 py-2  ">Edit</Touchable>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <div className=" w-full bg-surface rounded-2xl mx-4  p-4">
                              <div
                                className="pb-6"
                                onClick={() => {
                                  setIsEditDialogOpen(false);
                                }}
                              >
                                <Icon src={exit_main} varient="mid" />
                              </div>
                              <PaymentMethodForm
                                paymentMethodId={paymentMethod.id}
                                onSaveAction={() => {
                                  setIsEditDialogOpen(false);
                                }}
                              />
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog open={IsDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                          <AlertDialogTrigger>
                            <Touchable className=" p-6 pl-4 py-2">Delete</Touchable>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <div className=" w-full bg-surface rounded-2xl mx-4 pt-16 p-4">
                              <DeleteWarning
                                onCancel={() => setIsDeleteDialogOpen(false)}
                                onConfirmDelete={() => {
                                  onConfirmDelete(paymentMethod.id);
                                  setIsDeleteDialogOpen(false);
                                }}
                              />
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className=" mt-2 flex gap-2">
                    <img src={link_secondary} className=" w-5" alt="" />
                    <div className=" text-secondary text-sm font-semibold">
                      {allAccounts.find((account) => account.id === paymentMethod.accountId)?.name || "error account with the id deosnt exsists"}
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <>
            {Array.from([1, 2, 3], (value) => {
              return (
                <Skeleton key={value} className="w-full bg-container rounded-md p-4">
                  <div className=" flex gap-2 items-center">
                    <Skeleton className="rounded-md w-6 h-6" />
                    <Skeleton className="rounded-md w-24 h-6" />
                  </div>
                  <Skeleton className="rounded-md w-56 h-4 mt-2" />
                </Skeleton>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
