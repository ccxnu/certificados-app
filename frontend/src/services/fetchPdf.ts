import axios from "axios";
import { type User } from "../type";
type SetPdfFunction = (url: string) => void;

export const fetchPdf = async (
  userId: string,
  user: User | null,
  qrCode: string,
  setPdf: SetPdfFunction,
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/user/${userId}/pdf`,
      {
        nombre: user?.nombre,
        apellido: user?.apellido,
        saldo: user?.saldo,
        qrcode: qrCode,
      },
    );
    setPdf(response.data);
  } catch (error) {
    console.error("Error generating certificate:", error);
  }
};
