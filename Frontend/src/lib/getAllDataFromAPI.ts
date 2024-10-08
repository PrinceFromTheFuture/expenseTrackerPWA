import { getAllAccountsAsyncThunk } from "@/redux/accountsSlice";
import { getAllBudgetsAsyncThunk } from "@/redux/budgetsSlice";
import { getAllPaymentMethodsAsyncThunk } from "@/redux/paymentMethodsSlice";
import store from "@/redux/store";
import { getAllTransactionsAsyncThunk } from "@/redux/transactionsSlice";
import { getSpendingsInTimeFrameAsyncThunk, getUserBalanceAsyncThunk } from "@/redux/userSlice";
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
      dispatch(getAllAccountsAsyncThunk()).unwrap(),
    ]);
  } catch (error) {
    console.error("Failed to fetch all data from API:", error);
    // Optionally handle the error
  }
}

export default getAllDataFromAPI;
