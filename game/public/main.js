//To implement in frontend
const roomName = document.getElementById('room-name');
const usernameForm = document.getElementById('username-form');

// Get username from URL
const { username } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

console.log(username);

const socket = io();

// Join gameRoom
socket.emit('joinRoom', (username) => {
    //TODO update view
});

usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target.elements.username.value);
});

// Output to DOM
