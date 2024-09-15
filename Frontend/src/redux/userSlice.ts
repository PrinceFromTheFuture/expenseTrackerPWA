import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface User {
  oneDaySpendings: number;
  sevenDaySpendings: number;
  thirtyDaySpendings: number;
  balance: number;
  userid: string;
}

const initialState: User | null = {
  balance: 1223421,
  oneDaySpendings: 78453,
  sevenDaySpendings: 234888,
  thirtyDaySpendings: 1047341,
  userid: "7yh&3hd",
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
});

const userReducer = userSlice.reducer;
export default userReducer;

export const SpendingsTimeFrameSelector = (state: RootState, timeFrame: "1d" | "7d" | "30d") => {
  switch (timeFrame) {
    case "1d":
      return state.userSlice.oneDaySpendings;
    case "7d":
      return state.userSlice.sevenDaySpendings;
    case "30d":
      return state.userSlice.thirtyDaySpendings;
  }
};

export const userBalanceSelector = (state: RootState) => state.userSlice.balance;
