import { Router } from "express";
import { CreateUserController } from "./controllers/userController/createUserController";
import { ValidateUserController } from "./controllers/authController/validateUserController";
import { CreateLocationController } from "./controllers/locationController/createLocationController";
import { GetAllLocationsController } from "./controllers/locationController/getAllLocationsController";
import { AuthService } from "./services/authService/authService";
import { CreateGoogleUserController } from "./controllers/userController/createGoogleUserController";
import { GetAllUserLocationsController } from "./controllers/locationController/getUserLocationService";
import { ValidateGoogleUserController } from "./controllers/authController/validateGoogleUserController";

const router = Router();

router.post("/createUser", new CreateUserController().handle);
router.post("/createGoogleUser", new CreateGoogleUserController().handle);

router.post("/login", new ValidateUserController().handle)
router.post("/googleLogin", new ValidateGoogleUserController().handle)

router.post("/createLocation", new AuthService().private, new CreateLocationController().handle)

router.get("/getLocation", new GetAllLocationsController().handle)
router.post("/userLocation", new AuthService().private, new GetAllUserLocationsController().handle)

export {router}