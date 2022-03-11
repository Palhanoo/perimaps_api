"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ValidateUserService = void 0;
const typeorm_1 = require("typeorm");
const crypto = __importStar(require("crypto"));
const User_1 = require("../../database/entities/User");
const jsonwebtoken_1 = require("jsonwebtoken");
class ValidateUserService {
    validate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(User_1.User);
            const user = yield repo.findOne({ email });
            if (!user)
                return { success: false, message: 'Login inválido' };
            const { salt, key } = user;
            const payload = {
                email,
                password
            };
            const token = (0, jsonwebtoken_1.sign)(JSON.stringify(payload), process.env.SECRET_KEY);
            if (!salt) {
                return new Error('Usuário sem senha cadastrada!');
            }
            const hash = crypto.pbkdf2Sync(password, salt, 1000000, 64, 'sha512');
            if (hash.toString('hex') === key) {
                return { success: true, token };
            }
            else {
                return { success: false, message: 'Credenciais Inválidas' };
            }
        });
    }
}
exports.ValidateUserService = ValidateUserService;
