console.log("hello")
var socket = io("http://localhost:3000");
//client nhận dữ liệu từ server
socket.on("Server-sent-data", function(data) {
    $(".main-content-wrapper").append(`<div class="my-message-wrapper">
    <div class="my-message">
        <div class="created-at">12:04</div>
        <div class="my-message-content">
            <p>${data}</p>
        </div>
    </div>
</div>`);
});

//client gửi dữ liệu lên server
$(document).ready(function() {
    $("#send").click(function() {
        let chat = document.querySelector(".chat-content").value
        console.log(chat)
        socket.emit("Client-sent-data", chat);
    });
});