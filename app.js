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

server.listen(3000, () => {
    console.log("Đang lắng nghe ở cổng 3000")
});
// or with import syntax

var io = require("socket.io")(server);
// tạo kết nối giữa client và server
io.on("connection", function(socket) {
    console.log("có người đã online " + socket.id)
    socket.on("disconnect", function() {});
    //server lắng nghe dữ liệu từ client
    socket.on("send", function(data) {
        console.log(socket.id + "Vừa gửi :")
        console.log(data)
        io.sockets.emit("send", data); ////trả về tất cả Client
        // socket.emit("send",data)  trả về chỉ mình nó
        // socket.broadcast.emit("send",data) trả về tất cả trừ chính nó
    });
});

const loginController = require('./controller/Login')
const loginUserController = require('./controller/userLogin')
const registerController = require('./controller/Register')
const registerUserController = require('./controller/userRegister');
const { render } = require("ejs");
app.get('/login', loginController);
app.post('/login/user', loginUserController)
app.get('/register', registerController)
app.post('/register/user', registerUserController)
app.get('/home', (req, res) => {
    res.render("home")
})