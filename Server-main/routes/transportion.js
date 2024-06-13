import express from "express";
import { transportionController } from "../controllers/index.js";

const transportionRouter = express.Router();
transportionRouter.post('/create',transportionController.createTransportion);
transportionRouter.get('/',transportionController.findAllTransportion);
transportionRouter.delete('/:id',transportionController.deleteTransportion);


export default transportionRouter;