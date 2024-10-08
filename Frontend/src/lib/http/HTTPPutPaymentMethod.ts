import axios from "axios";
import { apiURL } from ".";
import { CreditCardPayemntMethodData, DebitCardPayemntMethodData, OtherPayemntMethodData } from "./HTTPPostPaymentMethod";

const HTTPPutPaymentMethod = async (filledForm: OtherPayemntMethodData | DebitCardPayemntMethodData | CreditCardPayemntMethodData, id: string) => {
  console.log({ ...filledForm, id });
  const res = await axios.put<{ success: boolean; message?: string }>(`${apiURL}/paymentMethods/${id}`, filledForm);
  return res.data;
};

export default HTTPPutPaymentMethod;
