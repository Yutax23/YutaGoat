async function gpt4o({ event, message, args, commandName, api, getLang }) {
  const prompt = args.join(" ");
  if (!prompt) {
    return message.reply(getLang("usage"));
  }
  const uid = event.senderID;
  const axios = require("axios");
try {
    const res = await axios.get(`https://for-devs.onrender.com/api/gpt4o`, {
      params: {
        query: encodeURIComponent(prompt),
        uid: uid,
        apikey: "api1"
      }
    });

    if (res.data.result) {
      message.reaction("✅", event.messageID);
      const text = res.data.result;
       message.reply(getLang("answer", text), (err, info) => {
        if (!err) {
    global.GoatBot.onReply.set(info.messageID, {
      commandName,
      author: uid,
      messageID: info.messageID
    });
      }
       });
    }
  } catch (error) {
    return message.reply(getLang("answer", error));
  }
};

module.exports = {
  config: {
    name: "gpt4o",
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
      answer: "◜gpt4o◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      usage: "◜gpt4o◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid Format\nPlease provide a message.\n━━━━━━━━━━━━━━━━━━"
    }
  },

  onStart: async function({ event, message, args, commandName, api, getLang }) {
    await gpt4o({ event, message, args, commandName, api, getLang });
  },

  onReply: async function({ Reply, event, message, args, commandName, api, getLang }) {
    const { author } = Reply;
    if (author != event.senderID) {
      return;
    }

    await gpt4o({ event, message, args, commandName, api, getLang });
  }
};