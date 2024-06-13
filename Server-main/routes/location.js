import express from "express";
import locationController from "../controllers/location.js";

const locationRouter = express.Router();

locationRouter.post("/create",locationController.createLocation)
locationRouter.get('/all', locationController.findAll)

export default locationRouter