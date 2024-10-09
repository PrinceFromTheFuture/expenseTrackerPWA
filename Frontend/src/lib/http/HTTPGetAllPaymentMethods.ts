import { PaymentMethod } from "@/types/types";
import { apiURL } from ".";
import axios from "axios";

const HTTPGetAllPaymentMethods = async () => {
  const res = await axios.get<PaymentMethod[]>(`${apiURL}/paymentMethods`);
  return res.data;
};
export default HTTPGetAllPaymentMethods;
