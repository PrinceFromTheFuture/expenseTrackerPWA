export interface Bugdet {
  name: string;
  isDeleted: boolean;

  color: string;
  iconURL: string;
  id: string;
}

export interface TransactionForm {
  amountInAgorot: number;
  budgetId: string | null;
  date: string | null;
  currentStage: number;
  paymentMethodId: null | string;
  title: string | null;
  description: string | null;
  editMode: boolean;
  id: string | null;
}
export interface TransactionFormAPI {
  amountInAgorot: number;
  budgetId: string;
  date: string;
  paymentMethodId: string;
  title: string;
  description: string | null;
}

export interface Transaction {
  amountInAgorot: number;
  budgetId: string;
  date: string;
  paymentMethodId: string;
  title: string;
  description: string | null;
  isDeleted: boolean;
  id: string;
}

export interface PaymentMethod {
  accountId: string;
  userId: string;
  name: string;
  iconURL: string;
  isDeleted: boolean;

  id: string;
  type: "other" | "creditCard" | "debitCard";
  creditLimit: number | null;
  resetDate: number | null;
  color: string | null;
}
export type PaymentMethodForm = Omit<PaymentMethod, "userId" | "isDeleted">;

export interface User {
  name: string;
  id: string;
  email: string;
  hashedPassword: string;
  accountsBalanceSumSelector: string[]; // string as id of accounts
  accountsDaysBackChange: number;
}
export interface Account {
  iconURL: string;
  id: string;
  name: string;
  isDeleted: boolean;

  balanceInAgorot: number;
}
export enum MonthsNames {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
