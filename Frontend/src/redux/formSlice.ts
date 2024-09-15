import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Form {
  amount: number;
}
const initialState: Form = { amount: 0 };
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
  },
});

const formSliceReducer = formSlice.reducer;
export default formSliceReducer;

export const formAmountSelctor = (state: RootState) => state.formSlice.amount;

export const {
  addNumberToFormAmount,
  decreaseNumberFromFormAmount,
  addOneToFormAmount,
  clearNumberFromFormAmount,
  decreaseOneFromFormAmount,
} = formSlice.actions;
