"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../contollers/user");
const router = (0, express_1.Router)();
router.post('/singup', user_1.singUp);
router.post('/singin', user_1.singIn);
exports.default = router;
