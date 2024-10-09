import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PaymentMethod } from "@/types/types";
import http from "@/lib/http/index";
import leumi from "@/assets/accountsIcons/leumi.svg";

export const getAllPaymentMethodsAsyncThunk = createAsyncThunk("paymentMethods/getAll", async () => {
  return await http.HTTPGetAllPaymentMethods();
});
export const postNewPaymentMethodAsyncThunk = createAsyncThunk(
  "paymentMethods/potNew",
  async (args: Omit<PaymentMethod, "id" | "userId">) => {
    return await http.HTTPPostPaymentMethod(args);
  }
);

export const updatePaymentMethodAsyncThunk = createAsyncThunk(
  "paymentMethods/updateOne",
  async (args: Omit<PaymentMethod, "userId">) => {
    return await http.HTTPPutPaymentMethod(args);
  }
);
export const deletePaymentMethodByIdAsyncThunk = createAsyncThunk(
  "paymentMethods/deleteOne",
  async (args: string) => {
    return await http.HTTPDeletePaymentMethod(args);
  }
);

const initialState: PaymentMethod[] = [];
const paymentMethodsSlice = createSlice({
  initialState,
  name: "paymentMethod",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPaymentMethodsAsyncThunk.fulfilled, (_, action) => {
      console.log(action.payload);
      return action.payload;
    });
  },
});

const paymentMethodsSliceReducer = paymentMethodsSlice.reducer;
export default paymentMethodsSliceReducer;

export const allPaymentMethodsSelector = (state: RootState) => state.paymentMethodsSlice;

export const getPaymentMethodNameByIdSelector = (state: RootState, paymentMethodId: string) => {
  const PaymentMethodFound = state.paymentMethodsSlice.find(
    (paymentMethod) => paymentMethod.id === paymentMethodId
  );
  if (!PaymentMethodFound) {
    return null;
  }
  return PaymentMethodFound.name;
};

export const getPaymentMethodById = (state: RootState, paymentMethodId: string | undefined) => {
  if (!paymentMethodId) {
    return undefined;
  }

  const paymentMethodFound = state.paymentMethodsSlice.find((paymentMethod) => {
    return paymentMethod.id === paymentMethodId;
  });
  return paymentMethodFound;
};
