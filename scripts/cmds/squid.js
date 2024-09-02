async function xyxy({ event, message, args, commandName, api, getLang }) {
  const prompt = args.join(" ");
  if (!prompt) {
    return message.reply(getLang("usage"));
  }
  const uid = event.senderID;
  const axios = require("axios");
try {
    const res = await axios.get(`https://www.samirxpikachu.run.place/persona`, {
      params: {
        prompt: encodeURIComponent(prompt),
        model: "llama-3-70b-chat",
        system: "You are Squidward From a cartoon SpongeBob SquarePants",
        userid: uid
      }
    });

    if (res.data) {
      message.reaction("✅", event.messageID);
      const text = res.data;
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
    name: "squid",
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
      answer: "◜squid◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      usage: "◜squid◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid Format\nPlease provide a message.\n━━━━━━━━━━━━━━━━━━"
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
