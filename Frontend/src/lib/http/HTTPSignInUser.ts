import axios from "axios";
import { apiURL } from ".";

const HTTPSignInUser = async (userData: { email: string; password: string }) => {
  const res = await axios.post<{ success: boolean; message?: string; userId?: string;  }>(
    `${apiURL}/auth/signIn`,
    userData
  );
  return res.data;
};
export default HTTPSignInUser;
