const user = {
  name: "",
  message: "",
};

const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => {
  console.log("Соединение установлено");
};

const chat = document.getElementById("chat");
const userNameForm = document.getElementById("user-name-form");
const chatForm = document.getElementById("chat-form");

const sendMessageChat = (message, name = "Вы") => {
  chat.insertAdjacentHTML(
    "beforeend",
    `<p>
      <span class="name">${name}: </span>
      <span class="user-chat-message">${message}</span>
    </p>`
  );
};

ws.onmessage = ({ data }) => {
  const { name, message } = JSON.parse(data);
  sendMessageChat(message, name);
};

userNameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  user.name = this.querySelector("[name=user-name]").value;
  this.remove();
});

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  user.message = this.querySelector("[name=message]").value;
  sendMessageChat(user.message, user.name);

  ws.send(JSON.stringify(user));
  this.reset();
});
