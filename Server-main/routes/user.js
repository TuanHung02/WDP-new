import express from "express";
import { userController } from "../controllers/index.js";

const userRouter = express.Router();

userRouter.get("/all", userController.getAllUsers)
userRouter.get("/:id", userController.getUserById)
userRouter.post("/create",userController.createAccount);
userRouter.post("/login",userController.loginAccount);
userRouter.put("/update/:id",userController.updateAccount);
userRouter.post("/forgot_password",userController.forgotPassword);
userRouter.post("/change_password/:id",userController.changePassword);

export default userRouter;