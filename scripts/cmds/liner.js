async function liner({ message, args, event, commandName }) {
  message.reaction("⏳", event.messageID, () => {}, true);
  const text = args.join(" ");
  if (!text) {
    message.reaction("❌", event.messageID, () => {}, true);
    message.reply(this.config.guide);
    return;
  }
  try {
    const response = await getResponse(text);
    message.reaction("✅", event.messageID, () => {}, true);
    return message.reply(response);
  }catch (error) {
    return message.reply(`❌ | ${error}`)
  }
  
};

async function getResponse(text) {
  try {
    const axios = require("axios");
    const res = await axios.get(`https://apis-samir.onrender.com/liner?prompt=${text}`);
    return res.data.answer;
  }catch (error) {
    return message.reply(`❌ | ${error}`);
  }
};

module.exports = {
  config: {
    name: "liner",
    version: "1",
    author: "null69",
    role: 0,
    description: "Liner Ai",
    category: "ai",
    guide: "Please provide a prompt\n" + "{pn} text"
  },
  onStart: liner
};