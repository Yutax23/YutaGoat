 const axios = require('axios');

module.exports = {
  config: {
    name: "logos",
    aliases: ["sv"], 
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: "logo image generator",
    longDescription: "",
    category: "image",
    guide: {
      en: "{pn} <prompt>  "
    }
  },

  onStart: async function ({ message, args }) {
    let prompt = args.join(" ");
   
    try {
      const apiUrl = `https://apis-samir.onrender.com/svg-gen?prompt=${encodeURIComponent(prompt)}`;
      
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