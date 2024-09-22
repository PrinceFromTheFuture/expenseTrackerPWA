export interface Bugdet {
  name: string;
  color: string;
  iconNmae: string;
  id: string;
}
export interface TransactionForm {
  amountInAgorot: number;
  budgetId: string;
  date: string | null;
  paymentMethodId: string;
  title: string;
  description: string;
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
