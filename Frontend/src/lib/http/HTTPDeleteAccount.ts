import axios from "axios";
import { apiURL } from ".";

const HTTPDeleteAccount = async (transactionId: string) => {
  const res = await axios.delete<{ success: boolean; message?: string }>(`${apiURL}/accounts/${transactionId}`);
  return res.data;
};

export default HTTPDeleteAccount;
