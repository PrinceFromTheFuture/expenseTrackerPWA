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
  paymentMethodId: null | string;
  title: string | null;
  description: string | null;
  editMode: boolean;
  id: string | null;
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
  name: string;
  iconURL: string;
  id: string;
}
