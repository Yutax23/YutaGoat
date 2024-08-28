async function xyxy({ event, message, args, commandName, api, getLang }) {
  const prompt = args.join(" ");
  if (!prompt) {
    return message.reply(getLang("usage"));
  }
  const id = event.senderID;
  const axios = require("axios");
try {
    const res = await axios.get(`https://deku-rest-api.gleeze.com/api/blackboxai`, {
      params: {
        q: encodeURIComponent(prompt),
        uid: id
      }
    });

    if (res.data.result) {
      message.reaction("✅", event.messageID);
      const text = res.data.result;
       message.reply(getLang("answer", text), (err, info) => {
        if (!err) {
    global.GoatBot.onReply.set(info.messageID, {
      commandName,
      author: id,
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
    name: "blackbox",
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
      answer: "◜blackbox◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      usage: "◜blackbox◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid Format\nPlease provide a message.\n━━━━━━━━━━━━━━━━━━"
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