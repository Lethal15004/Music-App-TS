"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = __importDefault(require("./topic.route"));
const song_route_1 = __importDefault(require("./song.route"));
const user_route_1 = __importDefault(require("./user.route"));
const checkLogin_middleware_1 = __importDefault(require("../../middleware/checkLogin.middleware"));
const routeClient = (app) => {
    app.use(checkLogin_middleware_1.default);
    app.use('/topics', topic_route_1.default);
    app.use('/songs', song_route_1.default);
    app.use('/user', user_route_1.default);
};
exports.default = routeClient;
