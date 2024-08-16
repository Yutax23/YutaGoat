async function spotify({ message, args, getLang }) {
  try {
    const axios = require("axios");
    const res = await axios.get(`https://hiroshi-rest-api.replit.app/search/spotify?search=${encodeURI(args.join(" "))}`);
    const tiny = await global.utils.shortenURL(res.data.download);
  message.send({ attachment: await global.utils.getStreamFromURL(tiny)});
  const msg = "📎 | 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗵𝗲𝗿𝗲: " + tiny;
  await message.reply(getLang("headers", msg));
  } catch (error) {
    return message.reply(error);
  }
};
module.exports = {
  config: {
    name: "spotify",
    author: "null69",
    description: "play music",
    category: "spotify downloader",
    guide: "{pn} title"
  },
  
  langs: {
    en: {
      headers: "◜𝗦𝗣𝗢𝗧𝗜𝗙𝗬 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
  }
  },
  onStart: spotify
};