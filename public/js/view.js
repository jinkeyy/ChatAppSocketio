function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
scrollToEndElm = () => {
        const elm = document.querySelector(".main-content-wrapper")
        elm.scrollTop = elm.scrollHeight;
    }
    // var socket = io("https://lunachat001.herokuapp.com");
let socket = io("https://lunachat001.herokuapp.com")
let user = getCookie("user")
if (user == "") {
    window.location = "https://lunachat001.herokuapp.com/login";
    alert("Đăng nhập đê bạn ơi !!!")
} else {
    console.log("online")
    socket.emit("online", user)
}
socket.on("online", (data) => {
    let rawHtml = ""
    for (const user of data) {
        console.log(user)
        rawHtml = rawHtml + `<div class="menbers">
        <div>
            <div class="status"></div>
            <div>${user}</div>
        </div>
    </div>`
    }
    $(".menbers-wrapper").html(rawHtml)
})
socket.on("send", function(data) {
    document.querySelector(".chat-content").value = ""
    let date = new Date(data.createdAt)
    let dateContent = date.getHours() + ":" + date.getMinutes()
        //  + " - " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    if (data.owner == user) {
        $(".main-content-wrapper").append(`<div class="my-message-wrapper ">
        <div class="my-message ">
            <div class="owner ">Bạn</div>
            <div class="created-at ">${dateContent}</div>
            <div class="my-message-content ">
                <p>${data.content}</p>
            </div>
        </div>
    </div>`)
        scrollToEndElm()
    } else {
        $(".main-content-wrapper").append(`<div class="guest-message-wrapper ">
        <div class="guest-message ">
            <div class="owner">${data.owner}</div>
            <div class="created-at ">${dateContent}</div>
            <div class="guest-message-content ">
                <p>${data.content}</p>
            </div>
        </div>
    </div>`)
        scrollToEndElm()
    }

});
//client gửi dữ liệu lên server
$(document).ready(function() {
    $("#send").click(function(e) {
        e.preventDefault();
        if (user == "") {
            window.location = "https://lunachat001.herokuapp.com/login";
            alert("tài khoản của bạn đã hết thời hạn !!!")
        }
        let content = document.querySelector(".chat-content").value
        let date = new Date()
        chats = {
            content: content,
            createdAt: date.toISOString(),
            owner: user
        }
        if (chats.content != "") {
            socket.emit("send", chats);
        }
    });
    $(".btn-out").click(() => {
        socket.emit("out", user);
        window.location = "https://lunachat001.herokuapp.com/login";
    })
});