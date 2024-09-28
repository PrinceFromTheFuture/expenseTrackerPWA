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
  id: string;
}

export interface User {
  name: string;
  id: string;
  email: string;
  balanceInAgorot: number;
  hashedPassword: string;
}
