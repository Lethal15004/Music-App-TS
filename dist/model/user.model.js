"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    tokenUser: String,
    avatar: String,
    status: {
        type: String,
        default: 'active'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    acceptFriends: Array,
    requestFriends: Array,
    listFriends: Array,
    statusOnline: String
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', userSchema, 'users');
exports.default = User;
