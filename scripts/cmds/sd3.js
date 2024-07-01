const axios = require('axios');

module.exports = {
  config: {
    name: "sd3",
    aliases: ["sd3-medium"], 
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: "anime image generator",
    longDescription: "",
    category: ai",
    guide: {
      en: "{pn} <prompt>  --ar 16:9"
    }
  },

  onStart: async function ({ message, args }) {
    let prompt = args.join(" ");
    

    try {
      const apiUrl = `https://samirxpikachu.onrender.com/sd3-medium?prompt=${encodeURIComponent(prompt)}`;
      
      const imageStream = await global.utils.getStreamFromURL(apiUrl);

      if (!imageStream) {
        return message.reply("Failed to retrieve image.");
      }
      
      return message.reply({
        body: 'here is your image',
        attachment: imageStream
      });
    } catch (error) {
      console.error(error);
      return message.reply("Failed to retrieve image.");
    }
  }
};