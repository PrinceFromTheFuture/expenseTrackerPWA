import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserPreferences {
  spendingsTimeFrame: "1d" | "7d" | "30d";
  accountsViewPreferences: {
    accountBalanceChanageInDays: number;
    caluclatedBalanceAccounts: string[];
  };
}

const initialState: UserPreferences = {
  spendingsTimeFrame: "1d",
  accountsViewPreferences: { accountBalanceChanageInDays: 7, caluclatedBalanceAccounts: [] },
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
      state.accountsViewPreferences.caluclatedBalanceAccounts = action.payload.selectedAccounts;
    },
  },
});

const userPreferencesReducer = userPreferencesSlice.reducer;
export default userPreferencesReducer;

export const { changeSpendingsTimeFrame, changeUserAccountPrefrences } = userPreferencesSlice.actions;

export const spendingsTimeFramePreferenceSelector = (state: RootState) => state.userPreferencesSlice.spendingsTimeFrame;

export const accountsViewPreferencesSelector = (state: RootState) => state.userPreferencesSlice.accountsViewPreferences;
