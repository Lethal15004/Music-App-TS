"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = __importDefault(require("./dashboard.route"));
const topic_route_1 = __importDefault(require("./topic.route"));
const song_route_1 = __importDefault(require("./song.route"));
const upload_route_1 = __importDefault(require("./upload.route"));
const routeAdmin = (app) => {
    const PATH = app.locals.prefixAdmin;
    app.use(`/${PATH}/dashboard`, dashboard_route_1.default);
    app.use(`/${PATH}/topics`, topic_route_1.default);
    app.use(`/${PATH}/songs`, song_route_1.default);
    app.use(`/${PATH}/upload`, upload_route_1.default);
};
exports.default = routeAdmin;
