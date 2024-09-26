
const express = require("express");

const userRouter = express.Router();


const userController = require("../controllers/userController");

userRouter.post("/", userController.register);
userRouter.post("/login", userController.login);
userRouter.put("/forgot", userController.forgot);
userRouter.get("/verify/:key", userController.verify);
userRouter.put("/reset", userController.reset);


module.exports = userRouter;