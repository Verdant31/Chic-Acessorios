"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var users_1 = require("./routes/users");
var app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
mongoose_1.default
    .connect("".concat(process.env.MONGO_URL))
    .then(function () {
        console.log("DB connection successfull");
    }).catch(function (err) {
        console.log(err);
    });
app.use("/users", users_1.router);
app.listen(process.env.PORT || 5000, function () { return console.log('Running on port 5000'); });
