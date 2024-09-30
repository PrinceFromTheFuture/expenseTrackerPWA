import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserPreferences {
  spendingsTimeFrame: "1d" | "7d" | "30d";
}

const initialState: UserPreferences = {
  spendingsTimeFrame: "1d",
};

const userPreferencesSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    changeSpendingsTimeFrame(
      state,
      action: PayloadAction<"1d" | "7d" | "30d">
    ) {
      state.spendingsTimeFrame = action.payload;
    },
  },
});

const userPreferencesReducer = userPreferencesSlice.reducer;
export default userPreferencesReducer;

export const { changeSpendingsTimeFrame } = userPreferencesSlice.actions;

export const spendingsTimeFramePreferenceSelector = (state: RootState) =>
  state.userPreferencesSlice.spendingsTimeFrame;
