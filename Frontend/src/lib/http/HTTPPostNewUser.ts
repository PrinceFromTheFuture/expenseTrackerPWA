import axios from "axios";
import { apiURL } from ".";

const HTTPPostNewUser = async (userData: { email: string; password: string }) => {
    const res = await axios.post<{ success: boolean; message?: string }>(`${apiURL}/auth/signUp`, userData);
    return res.data;
  };


  export default HTTPPostNewUser