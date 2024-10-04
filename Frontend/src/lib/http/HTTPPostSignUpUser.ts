import axios from "axios";
import { apiURL } from ".";

const HTTPPostSignUpUser = async (userData: { email: string; password: string; name: string | null }) => {
    const res = await axios.post<{ success: boolean; message?: string; userId?: string }>(`${apiURL}/auth/signUp`, userData);
  
    return res.data;
  };

  export default HTTPPostSignUpUser
  