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
exports.edit = exports.editPage = exports.create = exports.createPage = exports.index = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const topics_model_1 = __importDefault(require("../../model/topics.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        status: 'active',
        deleted: false
    });
    res.render('admin/pages/song/index', {
        title: 'Quản lý bài hát',
        songs: songs
    });
});
exports.index = index;
const createPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topics_model_1.default.find({
        deleted: false,
        status: 'active'
    }).select('title');
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: 'active'
    }).select('fullName');
    res.render('admin/pages/song/create', {
        title: 'Thêm mới bài hát',
        topics: topics,
        singers: singers
    });
});
exports.createPage = createPage;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        req.body.audio = req.body.audio[0];
    }
    const newSong = new song_model_1.default(req.body);
    yield newSong.save();
    req.flash('success', 'Thêm mới bài hát thành công');
    res.redirect('/admin/songs');
});
exports.create = create;
const editPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const song = yield song_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        const topics = yield topics_model_1.default.find({
            deleted: false,
            status: 'active'
        }).select('title');
        const singers = yield singer_model_1.default.find({
            deleted: false,
            status: 'active'
        }).select('fullName');
        res.render('admin/pages/song/edit', {
            title: "Chỉnh sửa bài hát",
            song: song,
            topics: topics,
            singers: singers
        });
    }
    catch (error) {
        req.flash('error', "Lỗi server");
        res.redirect('/admin/songs');
    }
});
exports.editPage = editPage;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (req.body.avatar) {
            req.body.avatar = req.body.avatar[0];
        }
        if (req.body.audio) {
            req.body.audio = req.body.audio[0];
        }
        yield song_model_1.default.updateOne({
            _id: id,
            deleted: false
        }, req.body);
        req.flash('success', 'Cập nhật bài hát thành công');
        res.redirect('back');
    }
    catch (_a) {
        req.flash('error', "Lỗi server");
        res.redirect('back');
    }
});
exports.edit = edit;
