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
// mongoose.connect('mongodb://localhost/chat_db', { useNewUrlParser: true }, () => {
//     console.log("kết nối thành công")
// })
const mongoAtlasUri = "mongodb+srv://Luna:12345@cluster0.yp9id.mongodb.net/Luna?retryWrites=true&w=majority";
try {
    mongoose.connect(
        mongoAtlasUri, { useNewUrlParser: true },
        () => console.log("Mongoose blog mindx is connected")
    )
} catch (e) {
    console.log("Could not connect");
}
var server = require("http").Server(app);

// server.listen(3000, () => {
//     console.log("Đang lắng nghe ở cổng 3000")
// });
app.listen(process.env.PORT || 3000, () => {
        console.log(`app is running on port ${process.env.PORT}`);
    })
    // or with import syntax
let user = []
var io = require("socket.io")(server);
// tạo kết nối giữa client và server
io.on("connection", function(socket) {
    console.log("có người đã online " + socket.id)
    socket.on("disconnect", function() {});
    socket.on("online", (data) => {
        if (!user.includes(data)) {
            user.push(data)
        }
        console.log(user)
        io.sockets.emit("online", user)
    })
    socket.on('out', function(data) {
        let valuesToRemove = [data]
        io.sockets.emit("online", user.filter(item => !valuesToRemove.includes(item)))
    });
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
app.get('/', (req, res) => {
    res.render("login")
})