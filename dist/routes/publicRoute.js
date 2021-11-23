"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../contollers/user");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post('/singup', user_1.singUp);
router.post('/singin', user_1.singIn);
router.get('/secure', passport_1.default.authenticate('jwt', { session: false }), user_1.UserIsValid);
exports.default = router;
