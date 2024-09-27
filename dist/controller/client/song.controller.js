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
exports.listen = exports.search = exports.listFavorite = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topics_model_1 = __importDefault(require("../../model/topics.model"));
const song_model_1 = __importDefault(require("../../model/song.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../model/favorite-song.model"));
const unidecode_1 = __importDefault(require("unidecode"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopics;
    const topic = yield topics_model_1.default.findOne({ slug: slugTopic, deleted: false, status: 'active' }).select('id title');
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        deleted: false,
        status: 'active'
    }).select("title avatar singerId like slug");
    for (const song of songs) {
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
        }).select('fullName');
        song['singerFullName'] = singer.fullName;
        song['likeCount'] = song.like.length;
    }
    res.render('client/pages/songs/list', {
        title: topic.title,
        songs: songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slugSong,
        deleted: false,
        status: 'active'
    });
    if (res.locals.user) {
        const existLikeSong = song.like.find(user => user === res.locals.user.id);
        try {
            const existFavoriteSong = yield favorite_song_model_1.default.findOne({
                userId: res.locals.user.id,
                songId: song.id
            });
            if (existFavoriteSong) {
                song['isFavorite'] = true;
            }
            if (existLikeSong) {
                song['isLike'] = true;
            }
        }
        catch (error) {
            res.json({
                code: 500,
                message: 'Lỗi server'
            });
        }
    }
    song['likeCount'] = song.like.length;
    let singer;
    let topic;
    try {
        singer = yield singer_model_1.default.findOne({
            _id: song.singerId
        }).select('fullName');
        topic = yield topics_model_1.default.findOne({
            _id: song.topicId
        }).select('title');
    }
    catch (error) {
        res.redirect('/topics');
    }
    let cleanedLyrics = "";
    if (song.lyrics) {
        cleanedLyrics = song.lyrics.replace(/\[\d{2}:\d{2}\.\d{2}\]/g, '');
    }
    res.render('client/pages/songs/detail', {
        title: 'Chi tiết bài hát',
        song: song,
        singer: singer,
        topic: topic,
        cleanedLyrics: cleanedLyrics
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const song = yield song_model_1.default.findOne({
            _id: id,
            deleted: false,
            status: 'active',
        }).select('like');
        const userExist = song.like.find(user => user === res.locals.user.id);
        let newLikeCount = song.like.length;
        let status = '';
        if (userExist) {
            yield song_model_1.default.updateOne({
                _id: id
            }, {
                $pull: {
                    like: res.locals.user.id
                }
            });
            --newLikeCount;
        }
        else {
            yield song_model_1.default.updateOne({
                _id: id
            }, {
                $push: {
                    like: res.locals.user.id
                }
            });
            status = 'add';
            ++newLikeCount;
        }
        res.json({
            code: 200,
            status: status,
            newLikeCount: newLikeCount
        });
    }
    catch (error) {
        res.json({
            code: 500,
            message: 'Lỗi server'
        });
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const data = {
        userId: res.locals.user.id,
        songId: id
    };
    let existFavoriteSong;
    try {
        existFavoriteSong = yield favorite_song_model_1.default.findOne(data);
    }
    catch (error) {
        res.json({
            code: 500,
            message: 'Lỗi server'
        });
    }
    let status = '';
    if (existFavoriteSong) {
        yield favorite_song_model_1.default.updateOne({
            userId: res.locals.user.id,
        }, {
            $pull: {
                songId: id
            }
        });
    }
    else {
        yield favorite_song_model_1.default.updateOne({
            userId: res.locals.user.id,
        }, {
            $push: {
                songId: id
            }
        });
        status = 'add';
    }
    res.json({
        code: 200,
        status: status
    });
});
exports.favorite = favorite;
const listFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFavoriteList = yield favorite_song_model_1.default.findOne({
            userId: res.locals.user.id
        });
        const listSong = [];
        for (const songId of userFavoriteList.songId) {
            const song = {};
            const infoSong = yield song_model_1.default.findOne({
                _id: songId,
                deleted: false,
                status: 'active'
            }).select("title avatar singerId slug");
            const infoSinger = yield singer_model_1.default.findOne({
                _id: infoSong.singerId
            }).select('fullName');
            song['infoSong'] = infoSong;
            song['infoSinger'] = infoSinger;
            listSong.push(song);
        }
        res.render('client/pages/songs/favorite', {
            title: 'Bài hát yêu thích',
            listSong: listSong
        });
    }
    catch (error) {
        req.flash('error', 'Tài khoản không tồn tại');
        res.redirect('/user/login');
    }
});
exports.listFavorite = listFavorite;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = `${req.params.type}`;
    const keyword = `${req.query.keyword}`;
    let songsFinal = [];
    if (keyword) {
        let keywordSlug;
        keywordSlug = `${keyword.trim().replace(/\s/g, '-')}`;
        keywordSlug = keywordSlug.replace(/-+/g, '-');
        keywordSlug = (0, unidecode_1.default)(keywordSlug);
        const regexKeyWord = new RegExp(keyword, 'i');
        const regexKeyWordSlug = new RegExp(keywordSlug, 'i');
        const songs = yield song_model_1.default.find({
            $or: [
                { title: regexKeyWord },
                { slug: regexKeyWordSlug }
            ],
            deleted: false,
            status: "active"
        }).select("title avatar singerId like slug");
        for (const item of songs) {
            const singerInfo = yield singer_model_1.default.findOne({
                _id: item.singerId
            }).select("fullName");
            const itemFinal = {
                title: item.title,
                avatar: item.avatar,
                singerId: item.singerId,
                singerFullName: singerInfo["fullName"],
                likeCount: item.like.length,
                slug: item.slug,
            };
            songsFinal.push(itemFinal);
        }
    }
    if (type === 'result') {
        res.render('client/pages/songs/list', {
            title: 'Kết quả tìm kiếm: ' + keyword,
            keyword: keyword,
            songs: songsFinal
        });
    }
    else if (type === 'suggest') {
        res.json({
            code: 200,
            songs: songsFinal,
        });
    }
    else {
        res.json({
            code: 400
        });
    }
});
exports.search = search;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = `${req.params.id}`;
        const song = yield song_model_1.default.findOne({
            _id: id,
            deleted: false,
            status: 'active'
        });
        const updateListen = song.listen + 1;
        yield song_model_1.default.updateOne({
            _id: id,
            deleted: false,
            status: 'active'
        }, {
            listen: updateListen
        });
        res.json({
            code: 200,
            listen: updateListen
        });
    }
    catch (error) {
        res.json({
            code: 500,
            message: 'Lỗi server'
        });
    }
});
exports.listen = listen;
