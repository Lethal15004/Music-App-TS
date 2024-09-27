"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const index_route_1 = __importDefault(require("./routes/client/index.route"));
const index_route_2 = __importDefault(require("./routes/admin/index.route"));
const system_1 = require("./config/system");
const database_1 = __importDefault(require("./config/database"));
(0, database_1.default)();
app.use('/tinymce', express_1.default.static(path_1.default.join(__dirname, 'node_modules', 'tinymce')));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express_1.default.static(`${__dirname}/public`));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)('alert-1x2'));
app.use((0, express_session_1.default)({ secret: 'some secret',
    resave: false,
    cookie: { maxAge: 20 * 60 * 1000 },
    saveUninitialized: true
}));
app.use((0, connect_flash_1.default)());
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
app.use((0, method_override_1.default)('_method'));
(0, index_route_1.default)(app);
(0, index_route_2.default)(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
