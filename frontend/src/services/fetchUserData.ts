import axios from "axios";
import { type User } from "../type";

type SetUserFunction = (user: User | null) => void;
type SetQrCodeUrlFunction = (url: string) => void;

export const fetchUserData = async (
  userId: string,
  setUser: SetUserFunction,
  setQrCodeUrl: SetQrCodeUrlFunction,
) => {
  try {
    const userResponse = await axios.get<User>(
      `http://localhost:3000/api/user/${userId}`,
    );
    const qrResponse = await axios.get<string>(
      `http://localhost:3000/api/user/${userId}/qr`,
    );
    setUser(userResponse.data);
    setQrCodeUrl(qrResponse.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
