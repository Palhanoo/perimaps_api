"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLocationController = void 0;
const createLocationService_1 = require("../../services/locationService/createLocationService");
class CreateLocationController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { latitude, longitude, user_id } = request.body;
            if (!latitude || !longitude || !user_id) {
                return response.status(422).json("Sem campos vazios!");
            }
            const createLocation = {
                latitude,
                longitude,
                user_id
            };
            const service = new createLocationService_1.CreateLocationService();
            const result = yield service.create(createLocation);
            if (result instanceof Error) {
                return response.status(400).json(result.message);
            }
            return response.json(result);
        });
    }
}
exports.CreateLocationController = CreateLocationController;