export interface Bugdet {
  name: string;
  color: string;
  iconURL: string;
  id: string;
}
export interface TransactionForm {
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
  description: string;
  id: string;
}
export interface PaymentMethod {
  name: string;
  iconURL: string;
  accountId: string;

  id: string;
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

export interface PaymentMethod {
  accountId: string;
  userId: string;
  name: string;
  type: "credit" | "debit" | "other";
  creditLimit: number;
  resetDate: number
}
