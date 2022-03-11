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
exports.CreateUserService = void 0;
const typeorm_1 = require("typeorm");
const crypto = __importStar(require("crypto"));
const User_1 = require("../../database/entities/User");
const jsonwebtoken_1 = require("jsonwebtoken");
class CreateUserService {
    getSaltAndKey(password) {
        const salt = crypto.randomUUID();
        const hash = crypto.pbkdf2Sync(password, salt, 1000000, 64, 'sha512');
        const key = hash.toString('hex');
        return { salt, key };
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(User_1.User);
            const user = yield repo.findOne({ email });
            return user;
        });
    }
    create({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(User_1.User);
            //select * from categories where name = name
            if ((yield this.findByEmail(email)) !== undefined)
                return { success: false, message: "Email já cadastrado" };
            const { salt, key } = this.getSaltAndKey(password);
            const payload = {
                email,
                password
            };
            const token = (0, jsonwebtoken_1.sign)(JSON.stringify(payload), process.env.SECRET_KEY);
            const user = repo.create({
                name,
                email,
                password,
                salt,
                key
            });
            yield repo.save(user);
            return { success: true, email: user.email, token };
        });
    }
}
exports.CreateUserService = CreateUserService;
