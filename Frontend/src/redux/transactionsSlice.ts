import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Transaction } from "@/types";
import { HTTPDeleteTransaction, HTTPGetAllTransactions, HTTPPostNewTransaction } from "@/http.requests";

export const getAllTransactionsAsyncThunk = createAsyncThunk("transactions/getAll", async () => {
  return await HTTPGetAllTransactions();
});

export const postNewTransactionAsyncThunk = createAsyncThunk(
  "form/postNewTransaction",
  async (_, thunkApi) => {
    let { amountInAgorot, budgetId, date, description, paymentMethodId, title } = (
      thunkApi.getState() as RootState
    ).formSlice;
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

export const deleteTransactionAsyncThunk = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionsId: string) => {
    const data = await HTTPDeleteTransaction(transactionsId);
    return data;
  }
);

const initialState: {
  data: Transaction[];
  status: "success" | "pending";
} = {
  data: [],
  status: "pending",
};

const transactionsSlice = createSlice({
  initialState,
  name: "transactions",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTransactionsAsyncThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });

    builder.addCase(getAllTransactionsAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(postNewTransactionAsyncThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.data.push(action.payload);
      }
      state.status = "success";
    });
    builder.addCase(postNewTransactionAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
  },
});

const transactionsReducer = transactionsSlice.reducer;
export default transactionsReducer;

export const singleTransactionSelector = (state: RootState, id: string) =>
  state.transactionsSlice.data.find((transaction) => transaction.id === id) || null;

export const allTransactionsSelctor = (state: RootState) => state.transactionsSlice.data;
export const getTransactionsDataStatusSelector = (state: RootState) => state.transactionsSlice.status;
