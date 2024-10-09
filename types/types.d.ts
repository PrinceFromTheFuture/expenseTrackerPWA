export interface Bugdet {
  name: string;
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
  id: string;
}

export interface PaymentMethod {
  accountId: string;
  userId: string;
  name: string;
  iconURL: string;
  id: string;
  type: "other" | "creditCard" | "debitCard";
  creditLimit: number | null;
  resetDate: number | null;
  color: string | null;
}

export interface User {
  name: string;
  id: string;
  email: string;
  balanceInAgorot: number;
  hashedPassword: string;
}

export interface Account {
  iconURL: string;
  id: string;
  name: string;
  balanceInAgorot: number;
}
