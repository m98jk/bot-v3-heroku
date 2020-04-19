require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const http = require("http");

const token = process.env.TELEGRAM_TOKEN;

let bot = "";

const server = http.createServer((req, res) => {
  res.end("Telegram Bot is Live 🔥");
});

if (process.env.NODE_ENV === "production") {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + process.env.TELEGRAM_TOKEN);
} else {
  bot = new TelegramBot(token, { polling: true });
}

bot.onText(/\/start/, (msg) => {
  console.log(msg.text);
  bot.sendMessage(msg.chat.id, "Welcome");
});

// bot.on("message", (msg) => {
//   var Hi = "hi";
//   if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
//     bot.sendMessage(msg.chat.id, "Hello dear user");
//   }
//   var bye = "bye";
//   if (msg.text.toString().toLowerCase().includes(bye)) {
//     bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
//   }
// });

server.listen(process.env.PORT || 4000, (err) => {
  if (!err) {
    console.log(
      `server is listening on port http://localhost:${process.env.PORT || 4000}`
    );
  }
});
