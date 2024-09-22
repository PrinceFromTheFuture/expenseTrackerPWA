import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Bugdet } from "@/types";
import { HTTPGetAllBudgets } from "@/http.requests";

export const getAllBudgetsAsyncThunk = createAsyncThunk("budgets/getAll", async () => {
  return await HTTPGetAllBudgets();
});

const budgetsSlice = createSlice({
  initialState: [] as Bugdet[],
  name: "budgets",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBudgetsAsyncThunk.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

const budgetsSliceReducer = budgetsSlice.reducer;
export default budgetsSliceReducer;

export const allBugdetsSelctor = (state: RootState) => state.budgetsSlice;

export const getBudgetNameByIdSelector = (state: RootState, budgetId: string) => {
  const budgetFound = state.budgetsSlice.find((budget) => budget.id === budgetId);
  if (!budgetFound) {
    return null;
  }

  return budgetFound.name;
};

export const getBudgetByIdSelector = (state: RootState, budgetId: string) => {
  const budgetFound = state.budgetsSlice.find((budget) => budget.id === budgetId);
  if (!budgetFound) {
    return null;
  }

  return budgetFound;
};
