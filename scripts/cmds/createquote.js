const axios = require("axios");
const pop = require("popcat-wrapper");

module.exports = {
  config: {
    name: "createquote",
    aliases: ["cq"],
    version: "1.0.0",
    author: "Null69",
    role: 0,
    description: "Put your quotes in random image.",
    category: "image",
    guide: "{pn} quotes | author"
  },
  onStart: async function ({ message, args, event }) {
    message.reaction("🤖", event.messageID, () => {}, true);
    const text = args.join(" ");
    if (!text.includes("|")) {
      message.reply(`Please follow the format:\n${this.config.guide}.`);
      return;
    }
    const slash = text.indexOf("|");
    const qt = text.substr(0, slash).trim();
    const auth = text.substr(slash + 1).trim();
    try {
      const imageUrl = `https://picsum.photos/200?blur=2`;

      message.reply({
        body: "Here's your quote!",
        attachment: await global.utils.getStreamFromURL(await pop.quote(imageUrl, qt, auth))
      });
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while processing your request. Please try again later.");
    }
  }
};
