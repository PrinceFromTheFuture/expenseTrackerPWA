import http from "@/lib/http/index.ts";
import { Account } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const fakeAccounts: Account[] = [
  { balanceInAgorot: 344626, iconURL: "/src/assets/accountsIcons/leumi.svg", id: "fffd3", name: "leumi bank" },
  { balanceInAgorot: 89732, iconURL: "/src/assets/accountsIcons/cash.svg", id: "fdffsdf3", name: "leumi bank" },
  { balanceInAgorot: 397864, iconURL: "/src/assets/accountsIcons/payPal.svg", id: "fd3", name: "leumi bank" },
];
const initialState: { status: "success" | "pending"; data: Account[] } = { data: fakeAccounts, status: "pending" };

export const getAllAccountsAsyncThunk = createAsyncThunk("/accounts/getAll", async () => {
  const allAcounts = await http.HTTPGetAllAccounts();
  return allAcounts;
});

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAccountsAsyncThunk.fulfilled, (state, action) => {
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

export const getAccountsStatusSelector = (state: RootState) => state.accountsSlice.status;

export const getAccountByIdSelector = (state: RootState, id: string | undefined) => {
  if (!id) {
    return undefined;
  }
  return state.accountsSlice.data.find((account) => account.id === id) as Account;
};
