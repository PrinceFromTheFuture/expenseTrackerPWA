import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PaymentMethod, PaymentMethodForm } from "@/types/types";
import http from "@/lib/http/index";
import leumi from "@/assets/accountsIcons/leumi.svg";

export const getAllPaymentMethodsAsyncThunk = createAsyncThunk("paymentMethods/getAll", async () => {
  return await http.HTTPGetAllPaymentMethods();
});
export const postNewPaymentMethodAsyncThunk = createAsyncThunk("paymentMethods/potNew", async (args: Omit<PaymentMethodForm, "id">) => {
  return await http.HTTPPostPaymentMethod(args);
});

export const updatePaymentMethodAsyncThunk = createAsyncThunk("paymentMethods/updateOne", async (args: PaymentMethodForm) => {
  return await http.HTTPPutPaymentMethod(args);
});
export const deletePaymentMethodByIdAsyncThunk = createAsyncThunk("paymentMethods/deleteOne", async (args: string) => {
  return await http.HTTPDeletePaymentMethod(args);
});

const initialState: { data: PaymentMethod[]; status: "success" | "pending" } = { data: [], status: "pending" };
const paymentMethodsSlice = createSlice({
  initialState,
  name: "paymentMethod",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPaymentMethodsAsyncThunk.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(getAllPaymentMethodsAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
  },
});

const paymentMethodsSliceReducer = paymentMethodsSlice.reducer;
export default paymentMethodsSliceReducer;

export const allPaymentMethodsSelector = (state: RootState) => state.paymentMethodsSlice.data;

export const getPaymentMethodNameByIdSelector = (state: RootState, paymentMethodId: string) => {
  const PaymentMethodFound = state.paymentMethodsSlice.data.find((paymentMethod) => paymentMethod.id === paymentMethodId);
  if (!PaymentMethodFound) {
    return null;
  }
  return PaymentMethodFound.name;
};

export const getPaymentMethodById = (state: RootState, paymentMethodId: string | undefined) => {
  if (!paymentMethodId) {
    return undefined;
  }

  const paymentMethodFound = state.paymentMethodsSlice.data.find((paymentMethod) => {
    return paymentMethod.id === paymentMethodId;
  });
  return paymentMethodFound;
};

export const getPaymentMethodsDataStatusSelector = (state: RootState) => {
  return state.paymentMethodsSlice.status;
};
