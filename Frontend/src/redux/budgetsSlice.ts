import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Bugdet {
  name: string;
  color: string;
  iconURL: string;
  id: string;
}

const fakeBudgets: Bugdet[] = [
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG61@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73ySHG361@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "7HG361@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG3161@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG36231@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG3461@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG23361@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73y44HG361@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG3Af61@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG36fas1@",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG361@33",
    iconURL: "@/assets/bus_surface",
  },
  {
    name: "transportation",
    color: "#6B4E82",
    id: "73yHG361@325sss",
    iconURL: "@/assets/bus_surface",
  },
];
const budgetsSlice = createSlice({
  initialState: fakeBudgets,
  name: "budgets",
  reducers: {},
});

const budgetsSliceReducer = budgetsSlice.reducer;
export default budgetsSliceReducer;

export const allBugdetsSelctor = (state: RootState) => state.budgetsSlice;
