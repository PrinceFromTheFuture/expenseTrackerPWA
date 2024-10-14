import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import http from "@/lib/http/index";

interface User {
  oneDaySpendings: number | null;
  sevenDaySpendings: number | null;
  thirtyDaySpendings: number | null;
  balance: number | null;
  userId: string | null;
  isLoggedIn: boolean;
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
    isLoggedIn: false,
  },
};

export const getSpendingsInTimeFrameAsyncThunk = createAsyncThunk(
  "/user/getSpendingsInTimeFrame",
  async (args: { from: string; to: string; defenition: "1d" | "7d" | "30d" }) => {
    const { from, to } = args;
    const data = await http.HTTPGetSpendingsInTimeFrame({
      from,
      to,
    });
    return { ...data, defenition: args.defenition };
  }
);


export const verifyUserTokenAsyncTunk = createAsyncThunk("users/acessTokenVerification", async () => {
  const data = await http.HTTPVerifyToken();
  return data;
});

export const signInAsyncTunk = createAsyncThunk("users/signIn", async (args: { email: string; password: string }) => {
  const data = await http.HTTPSignInUser(args);
  return data;
});
export const signUpAsyncTunk = createAsyncThunk("users/signUp", async (args: { email: string; password: string; name: string | null }) => {
  const data = await http.HTTPPostSignUpUser({ ...args, name: "User" });
  return data;
});
export const signOutAsyncTunk = createAsyncThunk("users/signOut", async () => {
  const data = await http.HTTPPostSignOutUser();
  return data;
});

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
   
    builder.addCase(verifyUserTokenAsyncTunk.fulfilled, (state, action) => {
      state.status = "success";
      if (action.payload.success === false || !action.payload.userId) {
        return;
      }
      state.user.userId = action.payload.userId;
      state.user.isLoggedIn = true;
    });
    builder.addCase(signInAsyncTunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(signInAsyncTunk.fulfilled, (state, action) => {
      state.status = "success";
      if (action.payload.success === false || !action.payload.userId) {
        return;
      }
      state.user.isLoggedIn = true;

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
      state.user.isLoggedIn = true;

      state.user.userId = action.payload.userId;
    });
    builder.addCase(signOutAsyncTunk.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(signOutAsyncTunk.fulfilled, (state) => {
      state.status = "success";
      state.user.isLoggedIn = false;
      state.user.userId = null;
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
export const getUserIsLoggedIn = (state: RootState) => state.userSlice.user.isLoggedIn;
