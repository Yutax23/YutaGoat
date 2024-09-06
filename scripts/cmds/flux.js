const axios = require('axios');
const fs = require('fs');
const path = require('path');

const config = {
  name: "flux",
  version: "1.0.0",
  author: "Samir Œ",
  role: 0,
  description: {
    vi: "Tạo hình ảnh từ một prompt",
    en: "Generate an image from a prompt"
  },
  category: "fun",
  guide: {
    vi: "{pn} <prompt>: Tạo hình ảnh từ một prompt",
    en: "{pn} <prompt>: Generate image from a prompt"
  },
  cooldown: 5
};

const langs = {
  vi: {
    missingPrompt: "Vui lòng cung cấp một prompt để tạo hình ảnh.",
    error: "Có lỗi xảy ra khi tạo hình ảnh. Vui lòng thử lại sau.",
  },
  en: {
    missingPrompt: "Please provide a prompt for the image.",
    error: "Error generating the image. Please try again later join https://t.me/Architectdevs or https://www.facebook.com/share/g/49KMZ7wmRTD7x8c7/ for support ",
  }
};

async function onStart({ args, message, event, getLang }) {
  const { threadID, messageID } = event;
  const prompt = args.join(" ");

  if (!prompt) {
    return message.reply(getLang("missingPrompt"));
  }

  const apiUrl = `https://samirxpikachuio.onrender.com/bflux?prompt=${encodeURIComponent(prompt)}`;

  try {
    const { data } = await axios.get(apiUrl);
    const imageUrl = data.imageUrl;

    const imagePath = path.resolve(__dirname, 'cache', `image_${threadID}.jpg`);
    const writer = fs.createWriteStream(imagePath);

    const imageResponse = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream'
    });
    imageResponse.data.pipe(writer);

    writer.on('finish', () => {
      message.reply({
        attachment: fs.createReadStream(imagePath)
      }, () => {
        fs.unlinkSync(imagePath);
      });
    });

    writer.on('error', (err) => {
      console.error(err);
      message.reply(getLang("error"));
    });

  } catch (error) {
    console.error(error);
    return message.reply(getLang("error"));
  }
}

module.exports = {
  config,
  langs,
  onStart
};