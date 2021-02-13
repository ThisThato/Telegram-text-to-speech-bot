const { Telegraf } = require("telegraf");
const axios = require("axios");
const getText = require("./convert");
require("dotenv").config();

//create a new instance of telegraf
const bot = new Telegraf("1499941290:AAHYdBaPOQRPbXb36xjFDKfCdHmZwBb_8Og");

bot.on("voice", async (ctx) => {
  //assign the file id to a variable
  const fileID = ctx.message.voice.file_id;

  //receive url and pass it into axios request
  try {
    const { href } = await ctx.telegram.getFileLink(fileID);
    const audio = await axios({
      url: href,
      method: "GET",
      responseType: "stream",
    });

    const message = await getText(audio.data);

    return ctx.reply(message);
  } catch (err) {
    ctx.reply(err.message);
  }
});

bot.launch();
console.log("Telegram bot is running...");
