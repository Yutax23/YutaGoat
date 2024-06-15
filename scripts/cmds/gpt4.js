async function gpt4({ event, message, args, commandName, api, getLang }) {
  const prompt = args.join(" ");
  if (!prompt) {
    return message.reply(getLang("usage"));
  }
  const uid = event.senderID;
  const axios = require("axios");
    const info = await message.reply(getLang("loading"));
    global.GoatBot.onReply.set(info.messageID, {
      commandName,
      author: uid,
      messageID: info.messageID
    });
try {
    const res = await axios.get(`https://deku-rest-api-ywad.onrender.com/gpt4`, {
      params: {
        prompt: encodeURIComponent(prompt),
        uid: uid
      }
    });

    if (res.data) {
      message.reaction("✅", event.messageID);
      const text = res.data.gpt4;
      return api.editMessage(getLang("answer", text), info.messageID);
    }
  } catch (error) {
    return api.editMessage(getLang("answer", error), info.messageID);
  }
};

module.exports = {
  config: {
    name: "gpt4",
    version: "1.0",
    author: "Null69",
    role: 0,
    countDown: 5,
    description: "Gpt4 Continuous conversation",
    category: "ai",
    guide: "⚠ | Invalid Format!\n" + "Please provide a prompt: {pn} prompt"
  },

  langs: {
    en: {
      answer: "◜gpt4◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━\n" + "reply to continue conversation or reply clear to reset conversation",
      loading: "◜gpt4◞\n━━━━━━━━━━━━━━━━━━\n" + "Please wait a moment...\n━━━━━━━━━━━━━━━━━━",
      usage: "◜gpt4◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid Format\nPlease provide a message.\n━━━━━━━━━━━━━━━━━━"
    }
  },

  onStart: async function({ event, message, args, commandName, api, getLang }) {
    await gpt4({ event, message, args, commandName, api, getLang });
  },

  onReply: async function({ Reply, event, message, args, commandName, api, getLang }) {
    const { author } = Reply;
    if (author != event.senderID) {
      return;
    }

    await gpt4({ event, message, args, commandName, api, getLang });
  }
};