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
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthService {
    private(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.headers.authorization) {
                const [_, token] = request.headers.authorization.split(' ');
                try {
                    const payload = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
                    request.user = payload;
                    console.log(payload);
                    next();
                }
                catch (err) {
                    return response.status(403).json({ message: 'tu é gay!' });
                }
            }
        });
    }
}
exports.AuthService = AuthService;
