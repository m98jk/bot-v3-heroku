require("dotenv").config();
const http = require("http");
const TeleBot = require("telebot");
const token = process.env.TELEGRAM_TOKEN;
const bot = new TeleBot(token);

const server = http.createServer((req, res) => {
  res.end("Telegram Bot is Live ...WoW");
});

bot.on("/hello", (msg) => {
  return bot.sendMessage(
    msg.from.id,
    `Hello 👋, ${msg.from.first_name}
    !I am your Telegram Word Assistant (TWA) - a wordtastic bot that helps you with the meaning of any word, right within Telegram.
    Try it out - send me a vocabulary you want to know its meaning.😉
    (c) 2018.  Developed by Oluwasetemi
    `,
    { notification: true, webPreview: true }
  );
});

bot.on("edit", (msg) => {
  return msg.reply.text("I saw it! You edited message!", { asReply: true });
});

// On command "about"
bot.on("/about", function (msg) {
  let text = `😽 This bot is powered by TeleBot library \n
    https://github.com/kosmodrey/telebot Go check the source code!
    \n It was written in Nodejs and can be you dictionary go to app within Telegram. Maintained and Developed by @Oluwasetemi!
    Hosted on openode as an opensource project.
    `;

  return bot.sendMessage(msg.chat.id, text);
});
bot.on("/help", (msg) => {
  bot.sendMessage(msg.chat.id, "How can I help you ");
});
bot.start();

server.listen(process.env.PORT || 4000, (err) => {
  if (!err) {
    console.log(
      `server is listening on port http://localhost:${process.env.PORT || 4000}`
    );
  }
});
