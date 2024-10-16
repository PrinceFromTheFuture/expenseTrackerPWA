import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "./store";
import http from "@/lib/http";

interface UserPreferences {
  spendingsTimeFrame: "1d" | "7d" | "30d";
  accountsViewPreferences: {
    accountBalanceChanageInDays: number;
    accountsBalanceSumSelector: string[];
  };
}

export const getAccountsBalanceSumSelectorAsyncThunk = createAsyncThunk("users/getAccountsBalanceSumSelector", async () => {
  const data = await http.HTTPGetAccountsBalanceSumSelector();
  return data;
});
export const updateAccountsBalanceSumSelectorAsyncThunk = createAsyncThunk("users/updateAccountsBalanceSumSelector", async (args: string[]) => {
  const data = await http.HTTPUpdateAccountsBalanceSumSelector(args);
  return data;
});
export const getAccountsDaysBackChangeAsyncThunk = createAsyncThunk("users/getAccountsDaysBackChange", async () => {
  const data = await http.HTTPGetAccountsDaysBackChange();
  return data;
});

const initialState: UserPreferences = {
  spendingsTimeFrame: "1d",
  accountsViewPreferences: { accountBalanceChanageInDays: 7, accountsBalanceSumSelector: [] },
};

const userPreferencesSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    changeSpendingsTimeFrame(state, action: PayloadAction<"1d" | "7d" | "30d">) {
      state.spendingsTimeFrame = action.payload;
    },
    changeUserAccountPrefrences(state, action: PayloadAction<{ selectedAccounts: string[]; accountBalanceViewTimeFrame: number }>) {
      state.accountsViewPreferences.accountBalanceChanageInDays = action.payload.accountBalanceViewTimeFrame;
      state.accountsViewPreferences.accountsBalanceSumSelector = action.payload.selectedAccounts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccountsBalanceSumSelectorAsyncThunk.fulfilled, (state, action) => {
      state.accountsViewPreferences.accountsBalanceSumSelector = action.payload.accountsBalanceSumSelector;
    });
    builder.addCase(getAccountsDaysBackChangeAsyncThunk.fulfilled, (state, action) => {
      state.accountsViewPreferences.accountBalanceChanageInDays = action.payload.accountsDaysBackChange;
    });
  },
});

const userPreferencesReducer = userPreferencesSlice.reducer;
export default userPreferencesReducer;

export const { changeSpendingsTimeFrame, changeUserAccountPrefrences } = userPreferencesSlice.actions;

export const spendingsTimeFramePreferenceSelector = (state: RootState) => state.userPreferencesSlice.spendingsTimeFrame;

export const accountsViewPreferencesSelector = (state: RootState) => state.userPreferencesSlice.accountsViewPreferences;
