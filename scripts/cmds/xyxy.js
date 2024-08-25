async function xyxy({ event, message, args, commandName, api, getLang }) {
  const prompt = args.join(" ");
  if (!prompt) {
    return message.reply(getLang("usage"));
  }
  const uid = event.senderID;
  const axios = require("axios");
try {
    const res = await axios.get(`https://deku-rest-api.gleeze.com/api/gpt4`, {
      params: {
        q: encodeURIComponent(prompt),
        id: uid
      }
    });

    if (res.data.result) {
      message.reaction("✅", event.messageID);
      const text = res.data.response;
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
    name: "xyxy",
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
      answer: "◜xyrene◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      usage: "◜xyrene◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid Format\nPlease provide a message.\n━━━━━━━━━━━━━━━━━━"
    }
  },

  onStart: async function({ event, message, args, commandName, api, getLang }) {
    await xyxy({ event, message, args, commandName, api, getLang });
  },

  onReply: async function({ Reply, event, message, args, commandName, api, getLang }) {
    const { author } = Reply;
    if (author != event.senderID) {
      return;
    }

    await xyxy({ event, message, args, commandName, api, getLang });
  }
};

const { GoatWrapper } = require('fca-liane-utils');
const wrapper = new GoatWrapper(module.exports);

wrapper.applyNoPrefix();