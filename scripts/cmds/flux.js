const axios = require('axios');

module.exports = {
  config: {
    name: "flux",
    aliases: ["flx"], 
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 2,
    shortDescription: "image generator",
    longDescription: "",
    category: "image",
    guide: {
      en: "{pn} <prompt>  "
    }
  },

  onStart: async function ({ message, args }) {
    let prompt = args.join(" ");

    try {
      const apiUrl = `https://www.samirxpikachu.run.place/fluxgen?prompt=${encodeURIComponent(prompt)}&model=3`;

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