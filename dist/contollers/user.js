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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIsValid = exports.singIn = exports.singUp = void 0;
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400
    });
}
const singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Erro campos invalidos' });
    const user = yield User_1.default.findOne({ email: email });
    if (user)
        return res.status(409).json({ message: 'Usuario ja existe' });
    const newUser = new User_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.singUp = singUp;
const singIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Erro campos invalidos' });
    const user = yield User_1.default.findOne({ email: email });
    if (!user)
        return res.status(400).json({ message: 'Usuario não existe' });
    const isMatch = yield user.comparePassword(password);
    if (isMatch)
        return res.status(200).json({
            message: "Bem Vindo",
            tokem: createToken(user)
        });
    return res.status(400).json({
        message: "Dados de acesso inválidos"
    });
});
exports.singIn = singIn;
const UserIsValid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send('I am a secure route validated with passport.js');
});
exports.UserIsValid = UserIsValid;
