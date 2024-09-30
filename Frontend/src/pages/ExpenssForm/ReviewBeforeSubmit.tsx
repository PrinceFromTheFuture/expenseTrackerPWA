import Touchable from "@/components/ui/generalComponents/Touchable";
import Icon from "@/components/ui/Icon";
import generalTransition from "@/lib/generalTransition";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import getAllDataFromAPI from "@/lib/getAllDataFromAPI";
import { getBudgetNameByIdSelector } from "@/pages/redux/budgetsSlice";
import { clearAllInForm, formDataSelector } from "@/pages/redux/formSlice";
import { getPaymentMethodNameByIdSelector } from "@/pages/redux/paymentMethodsSlice";
import { postNewTransactionAsyncThunk, updateNewTransactionAsyncThunk } from "@/pages/redux/transactionsSlice";
import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import facebookTest from "@/assets/facebookTest.svg";

import exit_main from "@/assets/exit_main.svg";
import paper_plane_surface from "@/assets/paper_plane_surface.svg";

const ReviewBeforeSubmit = () => {
  const formData = useAppSelector(formDataSelector);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const displayFormDataTitle = formData.title
    ? formData.title.length > 22
      ? `${formData.title.substring(0, 22)}...`
      : formData.title
    : "Untitled Transaction";

  const formDataBudgetName = useAppSelector((state) => getBudgetNameByIdSelector(state, formData.budgetId!));
  const formDatePaymentMethodName = useAppSelector((state) => getPaymentMethodNameByIdSelector(state, formData.paymentMethodId!));
  const handleSubmit = async () => {
    navigate("/");
    if (formData.editMode) {
      await dispatch(updateNewTransactionAsyncThunk());
    } else {
      await dispatch(postNewTransactionAsyncThunk());
    }

    // Ensure this runs after the transaction actions
    await getAllDataFromAPI(dispatch);

    // Clear the form after all API actions are complete
    dispatch(clearAllInForm());

    // Now navigate after all actions are done
    dispatch(clearAllInForm());
  };
  return (
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
            <div className="text-sm text-dark text-left font-bold">{dayjs(formData.date).format("DD.MM.YYYY HH:mm")}</div>
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
          <svg className=" mb-3 w-full px-1" width="829" height="10" viewBox="0 0 829 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2.62268e-07" y1="3" x2="829" y2="4.00007" stroke="#BECDD5" stroke-width="7" stroke-dasharray="12 12" />
          </svg>
          <div className=" flex justify-between items-center w-full">
            <div className="text-sm text-secondary text-left font-semibold">total amount</div>
            <div className="text-sm text-dark text-left font-bold">{formatAmountInAgorot(formData.amountInAgorot, true)}</div>
          </div>
        </div>
      </div>
      <div className=" w-full justify-between flex items-center gap-2">
        <AlertDialogCancel className=" w-full ">
          <Touchable className=" w-full bg-container rounded-2xl font-semibold text-secondary p-4">Cancel</Touchable>
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleSubmit} className=" w-full ">
          <Touchable className=" flex justify-center items-center gap-2 w-full bg-main rounded-2xl font-semibold text-surface p-4">
            <div>{formData.editMode ? "Save" : "Submit"}</div>
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
  );
};

export default ReviewBeforeSubmit;
