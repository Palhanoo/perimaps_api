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
exports.GetAllLocationsService = void 0;
const typeorm_1 = require("typeorm");
const Location_1 = require("../../database/entities/Location");
class GetAllLocationsService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Location_1.Location);
            const allLocations = yield repo.find();
            let data = [];
            for (const location of allLocations) {
                data.push({
                    latitude: Number(location.latitude),
                    longitude: Number(location.longitude)
                });
            }
            return data;
        });
    }
}
exports.GetAllLocationsService = GetAllLocationsService;
