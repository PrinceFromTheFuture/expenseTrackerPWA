import { getAllBudgetsAsyncThunk } from "@/pages/redux/budgetsSlice";
import { getAllPaymentMethodsAsyncThunk } from "@/pages/redux/paymentMethodsSlice";
import store from "@/pages/redux/store";
import { getAllTransactionsAsyncThunk } from "@/pages/redux/transactionsSlice";
import { getSpendingsInTimeFrameAsyncThunk, getUserBalanceAsyncThunk } from "@/pages/redux/userSlice";
import dayjs from "dayjs";

async function getAllDataFromAPI(dispatch: typeof store.dispatch) {
  try {
    await Promise.all([
      dispatch(getAllBudgetsAsyncThunk()).unwrap(),
      dispatch(getAllPaymentMethodsAsyncThunk()).unwrap(),
      dispatch(getAllTransactionsAsyncThunk()).unwrap(),
      dispatch(
        getSpendingsInTimeFrameAsyncThunk({
          from: dayjs().subtract(1, "days").toISOString(),
          to: dayjs().toISOString(),
          defenition: "1d",
        })
      ).unwrap(),
      dispatch(
        getSpendingsInTimeFrameAsyncThunk({
          from: dayjs().subtract(7, "days").toISOString(),
          to: dayjs().toISOString(),
          defenition: "7d",
        })
      ).unwrap(),
      dispatch(
        getSpendingsInTimeFrameAsyncThunk({
          from: dayjs().subtract(30, "days").toISOString(),
          to: dayjs().toISOString(),
          defenition: "30d",
        })
      ).unwrap(),
      dispatch(getUserBalanceAsyncThunk()).unwrap(),
    ]);
  } catch (error) {
    console.error("Failed to fetch all data from API:", error);
    // Optionally handle the error
  }
}

export default getAllDataFromAPI;
