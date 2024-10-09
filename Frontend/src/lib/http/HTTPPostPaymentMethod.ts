import axios from "axios";
import { apiURL } from ".";
import { PaymentMethod } from "@/types/types";

const HTTPPostPaymentMethod = async (filledForm: Omit<PaymentMethod, "id" | "userId">) => {
  console.log({ ...filledForm });
  const res = await axios.post<{ success: boolean; message?: string }>(
    `${apiURL}/paymentMethods`,
    filledForm
  );
  return res.data;
};

export default HTTPPostPaymentMethod;
