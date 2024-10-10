import axios from "axios";
import { apiURL } from ".";

const HTTPPutAccountById = async (filledForm: { name: string; balanceInAgorot: number; iconURL: string; id: string }) => {
  const { id, ...rest } = filledForm;
  const data = { ...rest };
  const res = await axios.put<{ success: boolean; message?: string }>(`${apiURL}/accounts/${id}`, data);
  return res.data;
};

export default HTTPPutAccountById;
