import axios from "axios";
import { Bugdet, PaymentMethod, Transaction } from "./types";
const apiURL = process.env.VITE_API_BASE_URI;

export const HTTPGetAllTransactions = async () => {
  const res = await axios.get<Transaction[]>(`${apiURL}/transactions`);
  return res.data;
};

export const HTTPGetAllBudgets = async () => {
  const res = await axios.get<Bugdet[]>(`${apiURL}/budgets`);
  return res.data;
};

export const HTTPGetAllPaymentMethods = async () => {
  const res = await axios.get<PaymentMethod[]>(`${apiURL}/paymentMethods`);
  return res.data;
};
