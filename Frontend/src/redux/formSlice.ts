import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import dayjs from "dayjs";
import { Transaction, TransactionForm } from "@/types";

const initialState: TransactionForm = {
  amountInAgorot: 0,
  budgetId: null,
  date: dayjs().toString(),
  paymentMethodId: null,
  title: null,
  description: null,
};
const formSlice = createSlice({
  initialState,
  name: "form",
  reducers: {
    addNumberToFormAmount(state, action: PayloadAction<number>) {
      const newAmount = Number(String(state.amountInAgorot).concat(String(action.payload)));
      if (newAmount < 100000000) {
        state.amountInAgorot = newAmount;
      } else {
        return;
      }
    },
    decreaseNumberFromFormAmount(state) {
      const newAmount = Number(String(state.amountInAgorot).slice(0, -1));
      state.amountInAgorot = newAmount;
    },
    clearNumberFromFormAmount(state) {
      state.amountInAgorot = 0;
    },
    addOneToFormAmount(state) {
      state.amountInAgorot += 100;
    },
    decreaseOneFromFormAmount(state) {
      state.amountInAgorot -= 100;
    },
    selectBudgetInForm(state, action: PayloadAction<string>) {
      state.budgetId = action.payload;
    },
    modifyDateInForm(state, action: PayloadAction<string | "initialize">) {
      if (action.payload === "initialize" || !state.date) {
        state.date = dayjs().toString();
        return;
      }

      const curentDateTime = dayjs(state.date);
      const selctedDate = dayjs(action.payload);
      const newDateTime = selctedDate
        .set("hours", curentDateTime.get("hours"))
        .set("minutes", curentDateTime.get("minutes"))
        .toString();
      state.date = newDateTime;
    },
    modifyHoursInForm(
      state,
      action: PayloadAction<{
        value: number;
        type: "hours" | "minutes";
      }>
    ) {
      const curentDateTime = dayjs(state.date);
      if (action.payload.type === "hours") {
        state.date = curentDateTime.set("hours", action.payload.value).toString();
      } else {
        state.date = curentDateTime.set("minutes", action.payload.value).toString();
      }
    },
    modifyTitleInForm(state, action: PayloadAction<string | null>) {
      state.title = action.payload;
    },
    modifyDescriptionInForm(state, action: PayloadAction<string | null>) {
      state.description = action.payload;
    },
    clearAllInForm() {
      const clearedForm: TransactionForm = {
        amountInAgorot: 0,
        budgetId: null,
        date: null,
        title: null,
        paymentMethodId: null,
        description: null,
      };
      return clearedForm;
    },
    modifyPaymentMethodInForm(state, action: PayloadAction<string>) {
      state.paymentMethodId = action.payload;
    },
  },
});

const formSliceReducer = formSlice.reducer;
export default formSliceReducer;

export const formAmountSelctor = (state: RootState) => state.formSlice.date;
export const formBudgetIdSelector = (state: RootState) => state.formSlice.budgetId;
export const formDateTimeSelector = (state: RootState) => state.formSlice.date;
export const formTitileSelector = (state: RootState) => state.formSlice.title;
export const formDescriptionSelector = (state: RootState) => state.formSlice.description;
export const formDataSelector = (state: RootState) => state.formSlice;

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
  modifyPaymentMethodInForm,
} = formSlice.actions;
