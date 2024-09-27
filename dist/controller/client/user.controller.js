"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.loginPage = exports.register = exports.registerPage = void 0;
const user_model_1 = __importDefault(require("../../model/user.model"));
const favorite_song_model_1 = __importDefault(require("../../model/favorite-song.model"));
const md5_1 = __importDefault(require("md5"));
const generateHelper = __importStar(require("../../helper/generateString.helper"));
const registerPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/user/register', {
        title: 'Đăng ký tài khoản'
    });
});
exports.registerPage = registerPage;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.fullName || !req.body.email || !req.body.password) {
        req.flash('error', 'Vui lòng nhập đầy đủ thông tin');
        return res.redirect('back');
    }
    const { fullName, email, password } = req.body;
    const userExist = yield user_model_1.default.findOne({
        email: email,
        deleted: false,
        status: 'active'
    });
    if (userExist) {
        req.flash('error', 'Tài khoản đã tồn tại');
        return res.redirect('back');
    }
    const data = {
        fullName: fullName,
        email: email,
        password: (0, md5_1.default)(password),
        tokenUser: generateHelper.generateRandomString(30)
    };
    const newUser = new user_model_1.default(data);
    yield newUser.save();
    const newListFavoriteSong = new favorite_song_model_1.default({
        userId: newUser.id,
    });
    yield newListFavoriteSong.save();
    req.flash('success', 'Đăng ký thành công');
    res.redirect('/user/login');
});
exports.register = register;
const loginPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/user/login', {
        title: 'Đăng nhập'
    });
});
exports.loginPage = loginPage;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        req.flash('error', 'Vui lòng nhập đầy đủ thông tin');
        return res.redirect('/user/login');
    }
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false,
    });
    if (!user) {
        req.flash('error', 'Tài khoản không tồn tại');
        res.redirect('back');
        return;
    }
    if ((0, md5_1.default)(password) !== user.password) {
        req.flash('error', 'Mật khẩu không chính xác');
        res.redirect('back');
        return;
    }
    if (user.status !== 'active') {
        req.flash('error', 'Tài khoản đang bị khóa');
        res.redirect('back');
        return;
    }
    res.cookie('tokenUser', user.tokenUser);
    yield user_model_1.default.updateOne({
        email: email,
        status: 'active',
        deleted: false
    }, {
        statusOnline: 'online'
    });
    req.flash('success', 'Đăng nhập thành công');
    res.redirect('/topics');
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.updateOne({
            tokenUser: req.cookies.tokenUser,
            status: 'active',
            deleted: false
        }, {
            statusOnline: 'offline'
        });
    }
    catch (error) {
        req.flash('error', 'Lỗi chưa đăng nhập');
        res.redirect('/user/login');
        return;
    }
    res.clearCookie('tokenUser');
    req.flash('success', 'Đăng xuất thành công');
    res.redirect('/topics');
});
exports.logout = logout;
