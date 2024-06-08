async function web({ message, args, event, commandName }) {
  message.reaction("⏳", event.messageID, () => {}, true);
  const text = args.join(" ");
  const uid = event.senderID;
  try {
    const response = await getResponse(text, uid);
await message.reaction("✅", event.messageID, () => {}, true);
    return message.reply(response);
  }catch (error) {
    return message.reply(`❌ | ${error}`)
  }
  
};

async function getResponse(text, uid) {
  try {
    const axios = require("axios");
    const res = await axios.get(`https://apis-samir.onrender.com/samirAi/web?prompt=${text}&uid=${uid}`);
    return res.data;
  }catch (error) {
    return message.reply(`❌ | ${error}`);
  }
};

module.exports = {
  config: {
    name: "webai",
    version: "1",
    author: "null69",
    role: 0,
    description: "Web Ai",
    category: "ai",
    guide: "Please provide a prompt\n" + "{pn} text"
  },
  onStart: web
};