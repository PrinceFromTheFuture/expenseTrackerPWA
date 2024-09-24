//@ts-ignore
import axios from "axios";
import { Bugdet, PaymentMethod, Transaction } from "./types";
const apiURL = import.meta.env.VITE_API_BASE_URI as string | undefined;

if (!apiURL) {
  console.log("api is not defined!!");
}

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

export const HTTPPostNewTransaction = async (filledForm: Omit<Transaction, "id">) => {
  const res = await axios.post<Transaction>(`${apiURL}/transactions`, filledForm);
  return res.data;
};

export const HTTPGetSpendingsInTimeFrame = async (timeFrame: { from: string; to: string }) => {
  const res = await axios.post<{
    amountInAgorot: number;
  }>(`${apiURL}/users/timeFrameSpendings`, timeFrame);
  return res.data;
};

export const HTTPGetUserBalance = async () => {
  const res = await axios.get<{
    balanceInAgorot: number;
  }>(`${apiURL}/users/balance`);
  return res.data;
};

export const HTTPDeleteTransaction = async (transactionId: string) => {
  const res = await axios.delete<{ success: boolean }>(`${apiURL}/transactions/${transactionId}`);
  return res.data;
};
