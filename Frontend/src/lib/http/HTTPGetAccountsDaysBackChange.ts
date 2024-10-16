import axios from "axios";
import { apiURL } from ".";
import { Bugdet } from "@/types/types";

const HTTPGetAccountsDaysBackChange = async () => {
  const res = await axios.get<{ accountsDaysBackChange: number; success: boolean }>(`${apiURL}/users/accountsDaysBackChange`);
  return res.data;
};
export default HTTPGetAccountsDaysBackChange;
