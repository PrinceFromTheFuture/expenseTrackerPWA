import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PaymentMethod } from "@/types/types";
import http from "@/lib/http/index";
import leumi from "@/assets/accountsIcons/leumi.svg";
import { CreditCardPayemntMethodData, DebitCardPayemntMethodData, OtherPayemntMethodData } from "@/lib/http/HTTPPostPaymentMethod";

export const getAllPaymentMethodsAsyncThunk = createAsyncThunk("paymentMethods/getAll", async () => {
  return await http.HTTPGetAllPaymentMethods();
});
export const postNewPaymentMethodAsyncThunk = createAsyncThunk(
  "paymentMethods/potNew",
  async (args: OtherPayemntMethodData | DebitCardPayemntMethodData | CreditCardPayemntMethodData) => {
    return await http.HTTPPostPaymentMethod(args);
  }
);

export const updatePaymentMethodAsyncThunk = createAsyncThunk(
  "paymentMethods/updateOne",
  async (args: { data: OtherPayemntMethodData | DebitCardPayemntMethodData | CreditCardPayemntMethodData; id: string }) => {
    return await http.HTTPPutPaymentMethod(args.data, args.id);
  }
);

const initialState: PaymentMethod[] = [
  {
    accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
    creditLimit: null,
    iconURL: leumi,
    id: "344d#",
    name: "test1",
    color: "#06062b",
    resetDate: null,
    type: "other",
    userId: "333",
  },
  {
    accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
    creditLimit: null,
    iconURL: leumi,
    id: "3344d#",
    color: "#06062b",
    name: "test2",
    resetDate: null,
    type: "other",
    userId: "333",
  },
  {
    accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
    creditLimit: null,
    iconURL: leumi,
    color: "#06062b",
    id: "33f44d#",
    name: "test1",
    resetDate: null,
    type: "other",
    userId: "333",
  },
  {
    accountId: "f3",
    creditLimit: null,
    iconURL: leumi,
    color: "#06062b",
    id: "343ds4d#",
    name: "test1",
    resetDate: null,
    type: "other",
    userId: "333",
  },
  {
    accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
    creditLimit: null,
    iconURL: leumi,
    id: "33f44fsd#",
    color: "#06062b",
    name: "test1",
    resetDate: null,
    type: "debitCard",
    userId: "333",
  },
  {
    accountId: "f3",
    creditLimit: null,
    iconURL: leumi,
    color: "#06062b",
    id: "343ds4d#",
    name: "test1",
    resetDate: null,
    type: "debitCard",
    userId: "333",
  },
  {
    accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
    creditLimit: null,
    iconURL: leumi,
    id: "33f44fsd#",
    name: "test1",
    resetDate: null,
    type: "debitCard",
    color: "#06062b",
    userId: "333",
  },
  {
    accountId: "f3",
    creditLimit: null,
    iconURL: leumi,
    id: "343ds4d#",
    name: "test1",
    resetDate: null,
    type: "other",
    color: "#06062b",
    userId: "333",
  },
  {
    accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
    creditLimit: null,
    iconURL: leumi,
    id: "33f4d4d#",
    name: "test1",
    resetDate: null,
    color: "#06062b",
    type: "other",
    userId: "333",
  },
  {
    accountId: "f3",
    creditLimit: null,
    iconURL: leumi,
    id: "343ds4d#",
    color: "#06062b",
    name: "test1",
    resetDate: null,
    type: "other",
    userId: "333",
  },
  {
    accountId: "0926efe3-6f10-4206-81f0-65199daf923b",
    creditLimit: 600000,
    iconURL: leumi,
    id: "0926efe3-6f10-4206-81f0-65199daf923b",
    name: "test1",
    color: "B971A0",
    resetDate: 21,
    type: "creditCard",
    userId: "333",
  },
];
const paymentMethodsSlice = createSlice({
  initialState,
  name: "paymentMethod",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPaymentMethodsAsyncThunk.fulfilled, (_, action) => {
      // return action.payload;
    });
  },
});

const paymentMethodsSliceReducer = paymentMethodsSlice.reducer;
export default paymentMethodsSliceReducer;

export const allPaymentMethodsSelector = (state: RootState) => state.paymentMethodsSlice;

export const getPaymentMethodNameByIdSelector = (state: RootState, paymentMethodId: string) => {
  const PaymentMethodFound = state.paymentMethodsSlice.find((paymentMethod) => paymentMethod.id === paymentMethodId);
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
