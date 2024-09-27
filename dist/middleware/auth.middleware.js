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
exports.getMethod = exports.notGetMethod = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const notGetMethod = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.tokenUser) {
        res.json({
            code: 401,
            message: 'Bạn cần đăng nhập để sử dụng tính năng này'
        });
        return;
    }
    const userExist = yield user_model_1.default.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false,
        status: 'active'
    }).select('fullName email phone avatar');
    if (!userExist) {
        res.json({
            code: 401,
            message: 'Tài khoản không tồn tài'
        });
        return;
    }
    next();
});
exports.notGetMethod = notGetMethod;
const getMethod = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.tokenUser) {
        req.flash('error', 'Cần đăng nhập để sử dụng tính năng này');
        res.redirect('/user/login');
        return;
    }
    const userExist = yield user_model_1.default.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false,
        status: 'active'
    }).select('fullName email phone avatar');
    if (!userExist) {
        req.flash('error', 'Tài khoản không hợp lệ');
        res.redirect('/user/login');
        return;
    }
    next();
});
exports.getMethod = getMethod;
