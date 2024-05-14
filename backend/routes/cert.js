import { Router } from "express";
import { certController } from "../controllers/cert.js";

export const certRouter = Router();

certRouter.get("/", certController.getAll);
certRouter.get("/:id", certController.getById);

certRouter.get("/:id/qr", certController.getQr);

certRouter.post("/:id/pdf", certController.getPdf);
