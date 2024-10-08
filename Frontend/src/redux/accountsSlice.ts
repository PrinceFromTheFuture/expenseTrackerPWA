import http from "@/lib/http/index.ts";
import { Account } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: { status: "success" | "pending"; data: Account[] } = { data: [], status: "pending" };

export const getAllAccountsAsyncThunk = createAsyncThunk("/accounts/getAll", async () => {
  const allAcounts = await http.HTTPGetAllAccounts();
  return allAcounts;
});

export const postNewAccountAsyncThunk = createAsyncThunk(
  "accounts/postNew",
  async (args: { name: string; balanceInAgorot: number; iconURL: string }) => {
    const res = await http.HTTPPostAccount(args);
    return res;
  }
);

export const updateAccountByIdAsynkThunk = createAsyncThunk(
  "accounts/updateOne",
  async (args: { name: string; balanceInAgorot: number; iconURL: string; id: string }) => {
    const res = await http.HTTPPutAccountById(args);
    return res;
  }
);
export const deleteAccountByIdAsynkThunk = createAsyncThunk("accounts/deleteOne", async (args: string) => {
  const res = await http.HTTPDeleteAccount(args);
  return res;
});

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAccountsAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getAllAccountsAsyncThunk.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(postNewAccountAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateAccountByIdAsynkThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteAccountByIdAsynkThunk.pending, (state) => {
      state.status = "pending";
    });
  },
});

const accountsSliceReducer = accountsSlice.reducer;

export default accountsSliceReducer;

export const getAllAccountsSelector = (state: RootState) => state.accountsSlice.data;

export const getAccountsStatusSelector = (state: RootState) => state.accountsSlice.status;

export const getAccountByIdSelector = (state: RootState, id: string | undefined) => {
  if (!id) {
    return undefined;
  }
  return state.accountsSlice.data.find((account) => account.id === id) as Account;
};
