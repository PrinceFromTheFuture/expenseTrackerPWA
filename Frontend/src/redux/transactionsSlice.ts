import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "./store";
import { Transaction } from "@/types";
import { HTTPGetAllTransactions, HTTPPostNewTransaction } from "@/http.requests";

export const getAllTransactionsAsyncThunk = createAsyncThunk("transactions/getAll", async () => {
  return await HTTPGetAllTransactions();
});

export const postNewTransactionAsyncThunk = createAsyncThunk(
  "form/postNewTransaction",
  async (_, thunkApi) => {
    let { amountInAgorot, budgetId, date, description, paymentMethodId, title } = (
      thunkApi.getState() as RootState
    ).formSlice;
    console.log((thunkApi.getState() as RootState).formSlice);
    if (!budgetId || !paymentMethodId || !date) {
      return null;
    }
    if (!title) {
      title = "Untitled Transaction";
    }
    const savedTransaction = await HTTPPostNewTransaction({
      budgetId,
      amountInAgorot,
      date,
      description,
      paymentMethodId,
      title,
    });

    return savedTransaction;
  }
);

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
    builder.addCase(postNewTransactionAsyncThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.push(action.payload);
      }
    });
  },
});

const transactionsReducer = transactionsSlice.reducer;
export default transactionsReducer;

export const singleTransactionSelector = (state: RootState, id: string) =>
  state.transactionsSlice.find((transaction) => transaction.id === id) || null;

export const allTransactionsSelctor = (state: RootState) => state.transactionsSlice;
