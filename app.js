// build server
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat_db', { useNewUrlParser: true }, () => {
    console.log("kết nối thành công")
})
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000, () => {
    console.log("Đang lắng nghe ở cổng 3000")
});

// tạo kết nối giữa client và server
io.on("connection", function(socket) {
    socket.on("disconnect", function() {});
    //server lắng nghe dữ liệu từ client
    socket.on("Client-sent-data", function(data) {
        //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
        socket.emit("Server-sent-data", data);
    });
});

const loginController = require('./controller/Login')
const loginUserController = require('./controller/userLogin')
app.get('/login', loginController);
app.get('login/user', loginUserController)