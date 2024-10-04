import axios from "axios";
import { apiURL } from ".";

const HTTPVerifyToken = async () => {
    const res = await axios.get<{ success: boolean; message?: string; userId?: string }>(`${apiURL}/auth/verifyToken`);
    return res.data;
  };

  export default HTTPVerifyToken