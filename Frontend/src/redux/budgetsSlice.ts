import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Bugdet } from "@/types";
import { HTTPGetAllBudgets } from "@/http.requests";

export const getAllBudgetsAsyncThunk = createAsyncThunk("budgets/getAll", async () => {
  return await HTTPGetAllBudgets();
});

const fakeBudgets: Bugdet[] = [
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG61@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73ySHG361@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "7HG361@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG3161@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG36231@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG3461@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG23361@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73y44HG361@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG3Af61@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG36fas1@",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG361@33",
    iconURL: "/src/assets/bus_surface.svg",
  },
  {
    name: "transportation",
    color: "#999999",
    id: "73yHG361@325sss",
    iconURL: "/src/assets/bus_surface.svg",
  },
];
const budgetsSlice = createSlice({
  initialState: fakeBudgets,
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
