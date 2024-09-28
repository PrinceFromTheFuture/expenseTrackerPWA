import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  HTTPGetSpendingsInTimeFrame,
  HTTPGetUserBalance,
  HTTPSignInUser,
  HTTPSignUpUser,
  HTTPVerifyToken,
} from "@/lib/http.requests";

interface User {
  oneDaySpendings: number | null;
  sevenDaySpendings: number | null;
  thirtyDaySpendings: number | null;
  balance: number | null;
  userId: string | null;
}

const initialState: {
  user: User;
  status: "success" | "pending";
} = {
  status: "pending",
  user: {
    balance: 0,
    oneDaySpendings: 0,
    sevenDaySpendings: 0,
    thirtyDaySpendings: 0,
    userId: null,
  },
};

export const getSpendingsInTimeFrameAsyncThunk = createAsyncThunk(
  "/user/getSpendingsInTimeFrame",
  async (args: { from: string; to: string; defenition: "1d" | "7d" | "30d" }) => {
    const { from, to } = args;
    const data = await HTTPGetSpendingsInTimeFrame({
      from,
      to,
    });
    return { ...data, defenition: args.defenition };
  }
);

export const getUserBalanceAsyncThunk = createAsyncThunk("/users/getBalance", async () => {
  const data = await HTTPGetUserBalance();
  return data;
});

export const verifyUserTokenAsyncTunk = createAsyncThunk("users/acessTokenVerification", async () => {
  const data = await HTTPVerifyToken();
  return data;
});

export const signInAsyncTunk = createAsyncThunk(
  "users/signIn",
  async (args: { email: string; password: string }) => {
    const data = await HTTPSignInUser(args);
    return data;
  }
);
export const signUpAsyncTunk = createAsyncThunk(
  "users/signUp",
  async (args: { email: string; password: string; name: string | null }) => {
    const data = await HTTPSignUpUser({ ...args, name: "User" });
    return data;
  }
);

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpendingsInTimeFrameAsyncThunk.fulfilled, (state, action) => {
      const newValue = action.payload.amountInAgorot;
      switch (action.payload.defenition) {
        case "1d":
          state.user.oneDaySpendings = newValue;
          break;
        case "7d":
          state.user.sevenDaySpendings = newValue;
          break;
        case "30d":
          state.user.thirtyDaySpendings = newValue;
          break;
      }
    });
    builder.addCase(getUserBalanceAsyncThunk.fulfilled, (state, action) => {
      state.user.balance = action.payload.balanceInAgorot;
    });
    builder.addCase(verifyUserTokenAsyncTunk.fulfilled, (state, action) => {
      state.status = "success";
      if (action.payload.success === false || !action.payload.userId) {
        return;
      }
      state.user.userId = action.payload.userId;
    });
    builder.addCase(signInAsyncTunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(signInAsyncTunk.fulfilled, (state,action) => {
      state.status = "success";
      if (action.payload.success === false || !action.payload.userId) {
        return;
      }
      state.user.userId = action.payload.userId;
    });
    builder.addCase(signUpAsyncTunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(signUpAsyncTunk.fulfilled, (state, action) => {
      state.status = "success";
      if (action.payload.success === false || !action.payload.userId) {
        return;
      }
      state.user.userId = action.payload.userId;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;

export const SpendingsTimeFrameSelector = (state: RootState, timeFrame: "1d" | "7d" | "30d") => {
  switch (timeFrame) {
    case "1d":
      return state.userSlice.user.oneDaySpendings;
    case "7d":
      return state.userSlice.user.sevenDaySpendings;
    case "30d":
      return state.userSlice.user.thirtyDaySpendings;
  }
};

export const userBalanceSelector = (state: RootState) => state.userSlice.user.balance;

export const getUserIdSelector = (state: RootState) => state.userSlice.user.userId;
export const getUserDataStatusSelector = (state: RootState) => state.userSlice.status;
