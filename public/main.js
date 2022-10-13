function tabManagement(ee) {
    console.log(ee);
    tab = document.getElementById(ee);
    toggle = document.getElementById(ee + "t");
    console.log(tab.style.display == "none");
    if (tab.style.display === "none") {
        tab.style.display = "inline";
        toggle.classList.add("underline")
    } else {
        tab.style.display = "none"
        toggle.classList.remove("underline")
    };
}

var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function (msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

let nick = prompt("Yo ton nom lo ?")
socket.emit('new user', nick)