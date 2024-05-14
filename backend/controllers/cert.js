import QRCode from "qrcode";
import { CertModel } from "../models/cert.js";
import { generatePdf } from "../middlewares/generatePdf.js";

export class certController {
  static async getAll(_, res) {
    try {
      const certificados = await CertModel.getCertAll();
      res.status(200).json(certificados);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Algo ha ocurrido al buscar los certificados." });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const certificadoById = await CertModel.getCertById({ id });
      res.status(200).json(certificadoById);
    } catch (error) {
      res.status(500).json({
        message: "Algo ha ocurrido al buscar el certificado por id.",
      });
    }
  }

  static async getQr(req, res) {
    const { id } = req.params;
    const qrData = `http://localhost:4000/validation/certificados/` + id;

    try {
      const qrCodeData = await QRCode.toDataURL(qrData);
      res.status(200).json(qrCodeData);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Algo ha ocurrido al generar el qr." });
    }
  }

  static async getPdf(req, res) {
    const { nombre, apellido, saldo, qrcode } = req.body;

    try {
      const pdfBase64 = await generatePdf({ nombre, apellido, saldo, qrcode });
      res.status(200).send(pdfBase64);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Algo ha ocurrido al generar el pdf." });
    }
  }

  /*static async create(req, res) {
    try {
    } catch (error) {}
  }
  static async delete(req, res) {
    try {
    } catch (error) {}
  }
  static async update(req, res) {
    try {
    } catch (error) {}
  } */
}
