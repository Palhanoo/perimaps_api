import { Router } from "express";
import { CreateUserController } from "./controllers/userController/createUserController";
import { ValidateUserController } from "./controllers/authController/validateUserController";
import { CreateLocationController } from "./controllers/locationController/createLocationController";
import { GetAllLocationsController } from "./controllers/locationController/getAllLocationsController";
import { AuthService } from "./services/authService/authService";

const router = Router();

router.post("/createUser", new CreateUserController().handle);
router.post("/login", new ValidateUserController().handle)
router.post("/createLocation", new AuthService().private, new CreateLocationController().handle)
router.get("/getLocation", new GetAllLocationsController().handle)

export {router}