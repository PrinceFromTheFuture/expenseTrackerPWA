import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import dayjs from "dayjs";

interface Form {
  amount: number;
  budgetId: string | null;
  dateTime: null | Date;
}
const initialState: Form = {
  amount: 0,
  budgetId: null,
  dateTime: null,
};
const formSlice = createSlice({
  initialState,
  name: "form",
  reducers: {
    addNumberToFormAmount(state, action: PayloadAction<number>) {
      const newAmount = Number(String(state.amount).concat(String(action.payload)));
      if (newAmount < 100000000) {
        state.amount = newAmount;
      } else {
        return;
      }
    },
    decreaseNumberFromFormAmount(state) {
      const newAmount = Number(String(state.amount).slice(0, -1));
      state.amount = newAmount;
    },
    clearNumberFromFormAmount(state) {
      state.amount = 0;
    },
    addOneToFormAmount(state) {
      state.amount += 100;
    },
    decreaseOneFromFormAmount(state) {
      state.amount -= 100;
    },
    selectBudgetInForm(state, action: PayloadAction<string>) {
      state.budgetId = action.payload;
    },
    modifyDateInForm(state, action: PayloadAction<Date | "initialize">) {
      if (action.payload || !state.dateTime) {
        state.dateTime = new Date();
        return;
      }
      const curentDateTime = dayjs(state.dateTime);
      const selctedDate = dayjs(action.payload);
      const newDateTime = selctedDate
        .set("hours", curentDateTime.get("hours"))
        .set("minutes", curentDateTime.get("minutes"))
        .toDate();
      state.dateTime = newDateTime;
    },
    modifyHoursInForm(state, action: PayloadAction<{ value: number; type: "hours" | "minutes" }>) {
      const curentDateTime = dayjs(state.dateTime);
      if (action.payload.type === "hours") {
        state.dateTime = curentDateTime.set("hours", action.payload.value).toDate();
      } else {
        state.dateTime = curentDateTime.set("minutes", action.payload.value).toDate();
      }
    },
  },
});

const formSliceReducer = formSlice.reducer;
export default formSliceReducer;

export const formAmountSelctor = (state: RootState) => state.formSlice.amount;

export const formBudgetIdSelector = (state: RootState) => state.formSlice.budgetId;

export const {
  addNumberToFormAmount,
  decreaseNumberFromFormAmount,
  addOneToFormAmount,
  clearNumberFromFormAmount,
  decreaseOneFromFormAmount,
  selectBudgetInForm,
} = formSlice.actions;
