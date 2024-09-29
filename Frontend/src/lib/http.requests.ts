//@ts-ignore
import axios from "axios";
import { Bugdet, PaymentMethod, Transaction } from "@/types";
const apiURL = import.meta.env.VITE_API_BASE_URI as string | undefined;

if (!apiURL) {
  console.log("api is not defined!!");
}

axios.defaults.withCredentials = true;

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

export const HTTPPPutNewTransaction = async (filledForm: Transaction) => {
  const { id, ...rest } = filledForm;
  const data = { ...rest };
  const res = await axios.put<{ success: boolean }>(`${apiURL}/transactions/${id}`, data);
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

export const HTTPPostNewUser = async (userData: { email: string; password: string }) => {
  const res = await axios.post<{ success: boolean; message?: string }>(`${apiURL}/auth/signUp`, userData);
  return res.data;
};

export const HTTPVerifyToken = async () => {
  const res = await axios.get<{ success: boolean; message?: string; userId?: string }>(`${apiURL}/auth/verifyToken`);
  return res.data;
};

export const HTTPSignInUser = async (userData: { email: string; password: string }) => {
  const res = await axios.post<{ success: boolean; message?: string; userId?: string }>(`${apiURL}/auth/signIn`, userData);
  return res.data;
};

export const HTTPSignUpUser = async (userData: { email: string; password: string; name: string | null }) => {
  const res = await axios.post<{ success: boolean; message?: string; userId?: string }>(`${apiURL}/auth/signUp`, userData);

  return res.data;
};

export const HTTPSignOutUser = async () => {
  const res = await axios.post<{ success: boolean; message?: string }>(`${apiURL}/auth/signOut`);

  return res.data;
};
