import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  HTTPGetSpendingsInTimeFrame,
  HTTPGetUserBalance,
} from "@/http.requests";

interface User {
  oneDaySpendings: number | null;
  sevenDaySpendings: number | null;
  thirtyDaySpendings: number | null;
  balance: number | null;
  userid: string;
}

const initialState: User = {
  balance: 0,
  oneDaySpendings: 0,
  sevenDaySpendings: 0,
  thirtyDaySpendings: 0,
  userid: "7yh&3hd",
};

export const getSpendingsInTimeFrameAsyncThunk =
  createAsyncThunk(
    "/user/getSpendingsInTimeFrame",
    async (args: {
      from: string;
      to: string;
      defenition: "1d" | "7d" | "30d";
    }) => {
      const { from, to } = args;
      const data = await HTTPGetSpendingsInTimeFrame({
        from,
        to,
      });
      return { ...data, defenition: args.defenition };
    }
  );

export const getUserBalanceAsyncThunk =
  createAsyncThunk("/users/getBalance", async () => {
    const data = await HTTPGetUserBalance();
    return data;
  });

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getSpendingsInTimeFrameAsyncThunk.fulfilled,
      (state, action) => {
        const newValue = action.payload.amountInAgorot;
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
      }
    );
    builder.addCase(
      getUserBalanceAsyncThunk.fulfilled,
      (state, action) => {
        state.balance = action.payload.balanceInAgorot;
      }
    );
  },
});

const userReducer = userSlice.reducer;
export default userReducer;

export const SpendingsTimeFrameSelector = (
  state: RootState,
  timeFrame: "1d" | "7d" | "30d"
) => {
  switch (timeFrame) {
    case "1d":
      return state.userSlice.oneDaySpendings;
    case "7d":
      return state.userSlice.sevenDaySpendings;
    case "30d":
      return state.userSlice.thirtyDaySpendings;
  }
};

export const userBalanceSelector = (
  state: RootState
) => state.userSlice.balance;
