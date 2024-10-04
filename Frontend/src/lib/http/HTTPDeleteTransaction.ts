import axios from "axios";
import { apiURL } from ".";

const HTTPDeleteTransaction = async (transactionId: string) => {
    const res = await axios.delete<{ success: boolean }>(`${apiURL}/transactions/${transactionId}`);
    return res.data;
  };
  
  export default HTTPDeleteTransaction