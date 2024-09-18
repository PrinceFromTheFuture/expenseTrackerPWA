import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import dayjs from "dayjs";

interface Form {
  amount: number;
  budgetId: string | null;
  dateTime: null | string;
  title: string | null;
  description: string | null;
}
const initialState: Form = {
  amount: 0,
  budgetId: null,
  dateTime: null,
  title: null,
  description: null,
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
    modifyDateInForm(state, action: PayloadAction<string | "initialize">) {
      if (action.payload === "initialize" || !state.dateTime) {
        state.dateTime = dayjs().toString();
        return;
      }

      const curentDateTime = dayjs(state.dateTime);
      const selctedDate = dayjs(action.payload);
      const newDateTime = selctedDate
        .set("hours", curentDateTime.get("hours"))
        .set("minutes", curentDateTime.get("minutes"))
        .toString();
      state.dateTime = newDateTime;
    },
    modifyHoursInForm(state, action: PayloadAction<{ value: number; type: "hours" | "minutes" }>) {
      const curentDateTime = dayjs(state.dateTime);
      if (action.payload.type === "hours") {
        state.dateTime = curentDateTime.set("hours", action.payload.value).toString();
      } else {
        state.dateTime = curentDateTime.set("minutes", action.payload.value).toString();
      }
    },
    modifyTitleInForm(state, action: PayloadAction<string | null>) {
      state.title = action.payload;
    },
    modifyDescriptionInForm(state, action: PayloadAction<string | null>) {
      state.description = action.payload;
    },
    clearAllInForm() {
      const clearedForm: Form = {
        amount: 0,
        budgetId: null,
        dateTime: null,
        title: null,
        description: null,
      };
      return clearedForm;
    },
  },
});

const formSliceReducer = formSlice.reducer;
export default formSliceReducer;

export const formAmountSelctor = (state: RootState) => state.formSlice.amount;

export const formBudgetIdSelector = (state: RootState) => state.formSlice.budgetId;
export const formDateTimeSelector = (state: RootState) => state.formSlice.dateTime;
export const formTitileSelector = (state: RootState) => state.formSlice.title;
export const formDescriptionSelector = (state: RootState) => state.formSlice.description;

export const {
  addNumberToFormAmount,
  decreaseNumberFromFormAmount,
  addOneToFormAmount,
  clearNumberFromFormAmount,
  decreaseOneFromFormAmount,
  selectBudgetInForm,
  modifyHoursInForm,
  modifyDateInForm,
  modifyTitleInForm,
  modifyDescriptionInForm,
  clearAllInForm,
} = formSlice.actions;
