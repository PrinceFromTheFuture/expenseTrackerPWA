import axios from "axios";
import { apiURL } from ".";

const HTTPDeletePaymentMethod = async (paymentMethodId: string) => {
  const res = await axios.delete<{ success: boolean; message?: string }>(
    `${apiURL}/paymentMethods/${paymentMethodId}`
  );
  return res.data;
};

export default HTTPDeletePaymentMethod;
