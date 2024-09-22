import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Bugdet } from "@/types";
import { HTTPGetAllBudgets } from "@/http.requests";

export const getAllBudgetsAsyncThunk = createAsyncThunk("budgets/getAll", async () => {
  return await HTTPGetAllBudgets();
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
    builder.addCase(getAllBudgetsAsyncThunk.fulfilled, (state, action) => {
      state.data = action.payload;
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
