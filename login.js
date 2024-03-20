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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var mysql = require("./db");
var express_1 = require("express");
var app = (0, express_1.Router)();
app.use(express.json());
app.use(cors());
var signatureKey = 'pavan123@';
var option = { expiresIn: '1h' };
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uname, pwd, query_str, responseData, result, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                uname = req.body.uname;
                pwd = req.body.pwd;
                query_str = "CALL Check_User(?,?,@uid,@uname); SELECT @uid UID, @uname UNAME";
                responseData = {
                    status: 400,
                    data: {
                        message: "null",
                        UID: 0,
                        UNAME: 'null',
                        token: "null"
                    },
                    error: 'Invalid'
                };
                return [4 /*yield*/, mysql.query(query_str, [uname, pwd])];
            case 1:
                result = _a.sent();
                console.log(result, "1");
                if (result[1][0].UID > 0) {
                    token = jwt.sign({ ID: result[1][0].UID, NAME: result[1][0].UNAME }, signatureKey, option);
                    console.log(token);
                    responseData = {
                        status: 200,
                        data: {
                            message: "Successfully Logged In.",
                            UID: result[0][0],
                            UNAME: result[1][0],
                            token: token
                        },
                        error: "None"
                    };
                    res.status(200).json({
                        Message: responseData
                    });
                    // res.status(200).json({
                    //     message: "Authentication successful",
                    //     UID: result[1][0].UID,
                    //     UNAME: result[1][0].UNAME,
                    //     token
                    // })
                }
                else {
                    res.status(400).json({
                        message: responseData
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("error occurred", error_1);
                res.status(400).send({
                    "code": 400,
                    "failed": "Error occurred during authentication"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/gettoken', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var readToken_header;
    return __generator(this, function (_a) {
        readToken_header = req.headers.authorization;
        console.log(readToken_header, "This came from Browser Headers.");
        res.status(200).json({ g: readToken_header });
        return [2 /*return*/];
    });
}); });
exports.default = app;
