import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { type User } from "../type";
import { fetchUserData } from "../services/fetchUserData";
import { fetchPdf } from "../services/fetchPdf";
import { generatePdf } from "../services/generatePdf";

export default function CertificadoPage() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [qrCode, setQrCodeUrl] = useState<string>("");
  const [pdf, setPdf] = useState<string>("");

  // Get user data and QR code URL
  useEffect(() => {
    if (userId) {
      fetchUserData(userId, setUser, setQrCodeUrl);
    }
  }, [userId]);

  // Post user data and QR code URL to generate PDF
  useEffect(() => {
    if (userId && user && qrCode) {
      fetchPdf(userId, user, qrCode, setPdf);
    }
  }, [userId, user, qrCode]);

  // Generate PDF and download it
  useEffect(() => {
    if (userId && pdf) {
      generatePdf(userId, pdf);
    }
  }, [userId, pdf]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col justify-center text-center mt-40 max-w-3xl mx-auto">
      <div className="max-w-sm text-left mx-auto bg-white border border-gray-200 rounded-lg shadow ">
        <div className="m-5">
          <h4 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
            Certificado
          </h4>
          <h5 className="mb-2 text-xl text-left text-gray-900">
            Información Personal
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            Nombre: {user.nombre}
          </p>

          <p className="mb-3 font-normal text-gray-700 ">
            Apellido: {user.apellido}
          </p>

          <p className="mb-3 font-normal text-gray-700 ">
            Saldo: $ {user.saldo}
          </p>

          <img
            src={qrCode}
            className="rounded-t-lg mx-auto"
            alt="Certificado de validación"
          />
        </div>
      </div>
    </main>
  );
}
