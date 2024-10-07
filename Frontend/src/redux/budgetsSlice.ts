import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Bugdet } from "@/types/types";
import http from "@/lib/http/index";

export const getAllBudgetsAsyncThunk = createAsyncThunk("budgets/getAll", async () => {
  return await http.HTTPGetAllBudgets();
});
export const postNewBudgetAsyncThunk = createAsyncThunk("budgets/postNew", async (args: { name: string; color: string; iconURL: string }) => {
  const response = await http.HTTPPostNewBudget(args);
  return response;
});

const initialState: {
  data: Bugdet[];
  status: "success" | "pending";
} = {
  data: [],
  status: "pending",
};

const budgetsSlice = createSlice({
  initialState,
  name: "budgets",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBudgetsAsyncThunk.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getAllBudgetsAsyncThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(postNewBudgetAsyncThunk.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(postNewBudgetAsyncThunk.fulfilled, (state, action) => {
      if (action.payload.budget) {
        state.data.push(action.payload.budget);
      }
      state.status = "success";
    });
  },
});

const budgetsSliceReducer = budgetsSlice.reducer;
export default budgetsSliceReducer;

export const allBugdetsSelctor = (state: RootState) => state.budgetsSlice.data;

export const getBudgetNameByIdSelector = (state: RootState, budgetId: string) => {
  const budgetFound = state.budgetsSlice.data.find((budget) => budget.id === budgetId);
  if (!budgetFound) {
    return null;
  }

  return budgetFound.name;
};

export const getBudgetByIdSelector = (state: RootState, budgetId: string) => {
  const budgetFound = state.budgetsSlice.data.find((budget) => budget.id === budgetId);
  if (!budgetFound) {
    return null;
  }

  return budgetFound;
};
export const getBudgetsStatus = (state: RootState) => state.budgetsSlice.status;
