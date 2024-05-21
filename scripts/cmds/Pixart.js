const axios = require('axios');

module.exports = {
  config: {
    name: "pixart",
    aliases: ["lite"], 
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 2,
    shortDescription: "image generator",
    longDescription: "",
    category: "𝗔𝗜-𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗘𝗗",
    guide: {
      en: "{pn} <prompt>  "
    }
  },

  onStart: async function ({ message, args }) {
    let prompt = args.join(" ");

    try {
      const apiUrl = `https://apis-samir.onrender.com/pixart/sigma?prompt=${encodeURIComponent(prompt)}`;
      
      const imageStream = await global.utils.getStreamFromURL(apiUrl);

      if (!imageStream) {
        return message.reply("Failed to retrieve image.");
      }
      
      return message.reply({
        body: '',
        attachment: imageStream
      });
    } catch (error) {
      console.error(error);
      return message.reply("Failed to retrieve image.");
    }
  }
};
