import { Router } from "express";
import { CreateUserController } from "./controllers/userController/createUserController";

const router = Router();

router.post("/createUser", new CreateUserController().handle);

export {router}