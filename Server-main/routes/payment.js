import express from "express";
import { paymentController } from "../controllers/index.js";
const paymentRouter = express.Router();

// paymentRouter.post("/pay", paymentController.createPayment)
// paymentRouter.post('/payMoney', paymentController.createCredentials)
// paymentRouter.get('/success', paymentController.success)
// paymentRouter.get('cancel', paymentController.cancel)

export default paymentRouter
