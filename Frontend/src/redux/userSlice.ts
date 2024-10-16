import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import http from "@/lib/http/index";

interface User {
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

    userId: null,
    isLoggedIn: false,
  },
};

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

export const userBalanceSelector = (state: RootState) => state.userSlice.user.balance;

export const getUserIdSelector = (state: RootState) => state.userSlice.user.userId;
export const getUserDataStatusSelector = (state: RootState) => state.userSlice.status;
export const getUserIsLoggedIn = (state: RootState) => state.userSlice.user.isLoggedIn;
