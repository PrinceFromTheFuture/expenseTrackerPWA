import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PaymentMethod {
  name: string;
  iconURL: string;
  id: string;
}
const initialState: PaymentMethod[] = [
  {
    iconURL: "/facebookTest.svg",
    id: "3dFD$3",
    name: "creaditCard 1",
  },
  {
    iconURL: "/facebookTest.svg",
    id: "3ddFD$3",
    name: "creaditCard 2",
  },
  {
    iconURL: "/facebookTest.svg",
    id: "3FdddD$3",
    name: "creaditCard 3",
  },
  {
    iconURL: "/facebookTest.svg",
    id: "3FD$3ddd",
    name: "creaditCard 4",
  },
];
const paymentMethodsSlice = createSlice({
  initialState,
  name: "paymentMethod",
  reducers: {},
});

const paymentMethodsSliceReducer =
  paymentMethodsSlice.reducer;
export default paymentMethodsSliceReducer;

export const allPaymentMethodsSelector = (
  state: RootState
) => state.paymentMethodsSlice;

export const getPaymentMethodNameByIdSelector = (
  state: RootState,
  paymentMethodId: string
) => {
  const PaymentMethodFound =
    state.paymentMethodsSlice.find(
      (paymentMethod) =>
        paymentMethod.id === paymentMethodId
    );
  if (!PaymentMethodFound) {
    return null;
  }
  return PaymentMethodFound.name;
};
