import axios from "axios";
import { apiURL } from ".";



const HTTPPostPaymentMethod = async (filledForm: OtherPayemntMethodData | DebitCardPayemntMethodData | CreditCardPayemntMethodData) => {
  console.log({ ...filledForm });

  const res = await axios.post<{ success: boolean; message?: string }>(`${apiURL}/paymentMethods`, filledForm);
  return res.data;
};

export default HTTPPostPaymentMethod;
