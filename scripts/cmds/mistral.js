async function mistral(event, message, args, commandName ) {
  try {
  message.reaction("⏱️", event.messageID, () => {}, true);
  const prompt = args.join(" ");
  if (!prompt) {
    return message.reply(this.config.guide);
  }
  const uid = event.senderID;
  const axios = require("axios");
  const res = await axios.get(`https://for-devs.onrender.com/api/mistral?query=${prompt}&apikey=api1&uid=${uid}`);
  if (res.data.status === "success") {
  message.reaction("✅", event.messageID, () => {}, true);
  }
  const text = res.data.result;
  return message.reply(text, (err, info) => {
    global.GoatBot.onReply.set(info.messageID, {
      commandName,
      author: uid,
      messageID: info.messageID
    });
  })
  }catch (error) {
    return message.reply(`${error}`);
  }
};

module.exports = {
  config: {
    name: "mistral",
    version: "1.0",
    author: "Null69",
    role: 0,
    countDown: 5,
    description: "chat with Mistral",
    category: "ai",
    guide: "⚠️ | Please provide a prompt: {pn} prompt"
  },
  onStart: async function({ event, message, args, commandName}) {
    mistral(event, message, args, commandName );
  },
  onReply: async function({ Reply, event, message, args, commandName}) {
    const { author } = Reply;
    if (author != event.senderID)
      return;
      
    mistral(event, message, args, commandName );
  }
};