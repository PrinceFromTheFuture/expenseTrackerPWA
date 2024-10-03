import { HTTPGetAllAccounts } from "@/lib/http.requests";
import { Account } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: { status: "success" | "pending"; data: Account[] } = { data: [], status: "pending" };

export const getAllAccountsAsyncThunk = createAsyncThunk("/accounts/getAll", async () => {
  const allAcounts = await HTTPGetAllAccounts();
  return allAcounts;
});

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAccountsAsyncThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(getAllAccountsAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
  },
});

const accountsSliceReducer = accountsSlice.reducer;

export default accountsSliceReducer;

export const getAllAccountsSelector = (state: RootState) => state.accountsSlice.data;
