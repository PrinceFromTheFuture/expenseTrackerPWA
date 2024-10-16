import http from "@/lib/http/index.ts";
import { Account } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: {
  status: "success" | "pending";
  data: Account[];
  balacneChangeByTimeFramePreference: { accountId: string; amountInAgorot: number }[];
  oneDaySpendings: number;
  sevenDaySpendings: number;
  thirtyDaySpendings: number;
} = { data: [], status: "pending", oneDaySpendings: 0, sevenDaySpendings: 0, thirtyDaySpendings: 0, balacneChangeByTimeFramePreference: [] };

export const getAllAccountsAsyncThunk = createAsyncThunk("/accounts/getAll", async () => {
  const allAcounts = await http.HTTPGetAllAccounts();
  return allAcounts;
});

export const getSpendingsInTimeFrameAsyncThunk = createAsyncThunk(
  "/account/getSpendingsInTimeFrame",
  async (args: { from: string; to: string; defenition: "1d" | "7d" | "30d" }) => {
    const { from, to } = args;
    const data = await http.HTTPGetSpendingsInTimeFrame({
      from,
      to,
    });
    return { ...data, defenition: args.defenition };
  }
);

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
    builder.addCase(getSpendingsInTimeFrameAsyncThunk.fulfilled, (state, action) => {
      const newValue = action.payload.data.reduce((accumulator, account) => {
        return accumulator + account.amountInAgorotUsedInTimeFrame;
      }, 0);
      switch (action.payload.defenition) {
        case "1d":
          state.oneDaySpendings = newValue;
          break;
        case "7d":
          state.sevenDaySpendings = newValue;
          break;
        case "30d":
          state.thirtyDaySpendings = newValue;
          break;
      }
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

export const SpendingsTimeFrameSelector = (state: RootState, timeFrame: "1d" | "7d" | "30d") => {
  switch (timeFrame) {
    case "1d":
      return state.accountsSlice.oneDaySpendings;
    case "7d":
      return state.accountsSlice.sevenDaySpendings;
    case "30d":
      return state.accountsSlice.thirtyDaySpendings;
  }
};
