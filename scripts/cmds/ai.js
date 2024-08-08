async function supot({ message, args, event, getLang }) {
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
    const res = await axios.get(`https://haze-claude-api-c56bb0cd1fe4.herokuapp.com/claude?q=${encodeURIComponent(text)}`);
    return res.data.response;
  }catch (error) {
    return message.reply(`❌ | ${error}`);
  }
};

module.exports = {
  config: {
    name: "ai",
    version: "1",
    author: "null69",
    role: 0,
    description: "Ai Claude",
    category: "ai",
    guide: "Please provide a prompt\n" + "{pn} text"
  },
langs: {
en: {
answer: ""
}
},
  onStart: supot
};