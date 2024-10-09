import axios from "axios";
import { apiURL } from ".";
import { PaymentMethod } from "@/types/types";

const HTTPPutPaymentMethod = async (filledForm: Omit<PaymentMethod, "userId">) => {
  const { id, ...rest } = filledForm;
  const res = await axios.put<{ success: boolean; message?: string }>(`${apiURL}/paymentMethods/${id}`, rest);
  return res.data;
};

export default HTTPPutPaymentMethod;
