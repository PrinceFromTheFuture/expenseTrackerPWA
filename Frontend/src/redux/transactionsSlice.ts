import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "./store";

interface Transaction {
  amountInAgorot: number;
  budget: string;
  title: string;
  paymentMethod: string;
  id: string;
  date: string;
}

const fakeTransactions: Transaction[] = [
  {
    amountInAgorot: 1332443,
    budget: "transportation",
    title: "chocolate",
    paymentMethod: "credit card",
    id: "#$327892h",
    date: dayjs().toString(),
  },
  {
    amountInAgorot: 89152,
    budget: "transportation",
    title: "chocolate",
    paymentMethod: "credit card",
    id: "#$F3273892h",
    date: dayjs().toString(),
  },
  {
    amountInAgorot: 51985,
    budget: "transportation",
    title: "chocolate",
    paymentMethod: "credit card",
    id: "#$F3292h",
    date: dayjs().toString(),
  },
  {
    amountInAgorot: 92124,
    budget: "transportation",
    title: "chocolate",
    paymentMethod: "credit card",
    id: "#$F3hs27892h",
    date: dayjs().toString(),
  },
];

const initialState = fakeTransactions;

const transactionsSlice = createSlice({
  initialState,
  name: "transactions",
  reducers: {},
});

const transactionsReducer = transactionsSlice.reducer;
export default transactionsReducer;

export const singleTransactionSelector = (state: RootState, id: string) =>
  state.transactionsSlice.find((transaction) => transaction.id === id) || null;

export const allTransactionsSelctor = (state: RootState) =>
  state.transactionsSlice;
