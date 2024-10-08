export interface OtherPayemntMethodData {
  iconURL: string;
  type: "other";
  name: string;
  accountId: string;
}

export interface DebitCardPayemntMethodData extends Omit<OtherPayemntMethodData, "type"> {
  color: string;
  type: "debitCard"; // Override type
}

export interface CreditCardPayemntMethodData extends Omit<DebitCardPayemntMethodData, "type"> {
  creditLimit: number | null;
  resetDate: number | null;
  type: "creditCard"; // Override type
}
