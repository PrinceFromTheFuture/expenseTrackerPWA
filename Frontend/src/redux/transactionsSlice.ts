import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "./store";
import { Transaction } from "@/types";
import { HTTPGetAllTransactions } from "@/http.requests";

export const getAllTransactionsAsyncThunk = createAsyncThunk("transactions/getAll", async () => {
  return await HTTPGetAllTransactions();
});

const fakeTransactions: Transaction[] = [
  {
    amountInAgorot: 1332443,
    budgetId: "transportation",
    title: "chocolate",
    paymentMethodId: "credit card",
    description: "fdsfe",
    id: "#$327892h",
    date: dayjs().toString(),
  },
  {
    amountInAgorot: 89152,
    budgetId: "transportation",
    title: "chocolate",
    description: "fdsfe",
    paymentMethodId: "credit card",
    id: "#$F3273892h",
    date: dayjs().toString(),
  },
  {
    amountInAgorot: 51985,
    budgetId: "transportation",
    title: "chocolate",
    description: "fdsfe",
    paymentMethodId: "credit card",
    id: "#$F3292h",
    date: dayjs().toString(),
  },
  {
    amountInAgorot: 92124,
    budgetId: "transportation",
    title: "chocolate",
    description: "fdsfe",
    paymentMethodId: "credit card",
    id: "#$F3hs27892h",
    date: dayjs().toString(),
  },
];

const initialState = fakeTransactions;

const transactionsSlice = createSlice({
  initialState,
  name: "transactions",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTransactionsAsyncThunk.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

const transactionsReducer = transactionsSlice.reducer;
export default transactionsReducer;

export const singleTransactionSelector = (state: RootState, id: string) =>
  state.transactionsSlice.find((transaction) => transaction.id === id) || null;

export const allTransactionsSelctor = (state: RootState) => state.transactionsSlice;
