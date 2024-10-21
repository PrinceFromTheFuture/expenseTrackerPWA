import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Bugdet, MonthsNames } from "@/types/types";
import http from "@/lib/http/index";

export const getAllBudgetsAsyncThunk = createAsyncThunk("budgets/getAll", async () => {
  return await http.HTTPGetAllBudgets();
});
export const postNewBudgetAsyncThunk = createAsyncThunk("budgets/postNew", async (args: { name: string; color: string; iconURL: string }) => {
  const response = await http.HTTPPostNewBudget(args);
  return response;
});

export const getBudgetsSpendingsByMonthsThunk = createAsyncThunk("budgets/getBudgetsSpendingsByMonths", async () => {
  const response = await http.HTTPGetBudgetsSpendingsByMonths();
  return response;
});

const initialState: {
  data: Bugdet[];
  spendingsByMonths: {
    status: "success" | "pending";
    data: { month: MonthsNames; year: number; data: { budgetId: string; amountInAgorot: number }[] }[];
  };
  status: "success" | "pending";
} = {
  data: [],
  spendingsByMonths: { data: [], status: "pending" },
  status: "pending",
};

const budgetsSlice = createSlice({
  initialState,
  name: "budgets",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBudgetsAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getAllBudgetsAsyncThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(postNewBudgetAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(postNewBudgetAsyncThunk.fulfilled, (state, action) => {
      if (action.payload.budget) {
        state.data.push(action.payload.budget);
      }
      state.status = "success";
    });
    builder.addCase(getBudgetsSpendingsByMonthsThunk.fulfilled, (state, action) => {
      state.spendingsByMonths.status = "success";
     
      state.spendingsByMonths.data = action.payload.data;

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
export const getBudgetIconUrlByIdSelector = (state: RootState, budgetId: string) => {
  const budgetFound = state.budgetsSlice.data.find((budget) => budget.id === budgetId);
  if (!budgetFound) {
    return null;
  }

  return budgetFound.iconURL;
};

export const getBudgetByIdSelector = (state: RootState, budgetId: string) => {
  const budgetFound = state.budgetsSlice.data.find((budget) => budget.id === budgetId);
  if (!budgetFound) {
    return null;
  }

  return budgetFound;
};

export const getBudgetColorByIdSelector = (state: RootState, budgetId: string) => {
  const budgetFound = state.budgetsSlice.data.find((budget) => budget.id === budgetId);
  if (!budgetFound) {
    return null;
  }

  return budgetFound.color;
};

export const getBudgetsSpendingsByMonthsSelector = (state: RootState) => state.budgetsSlice.spendingsByMonths.data;
export const getBudgetsSpendingsByMonthsStatusSelector = (state: RootState) => state.budgetsSlice.spendingsByMonths.status;
export const getBudgetsStatus = (state: RootState) => state.budgetsSlice.status;
