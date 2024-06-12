async function supot({ message, args, event, commandName }) {
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
    const res = await axios.get(`https://jipitiforow-efec7e4faff4.herokuapp.com/api/gpt4?q=${encodeURIComponent(text)}`);
    return res.data;
  }catch (error) {
    return message.reply(`❌ | ${error}`);
  }
};

module.exports = {
  config: {
    name: "*ai",
    version: "1",
    author: "null69",
    role: 0,
    description: "Ai GPT4",
    category: "ai",
    guide: "Please provide a prompt\n" + "{pn} text"
  },
  onStart: supot
};
const { GoatWrapper } = require('fca-liane-utils');
const wrapper = new GoatWrapper(module.exports);

wrapper.applyNoPrefix();