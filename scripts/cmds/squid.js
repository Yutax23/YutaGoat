const axios = require("axios");
const Prefixes = [
  'squid'
];

module.exports = {
  config: {
    name: "squid",
    version: "1.0",
    author: "Null69 | Deku",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "chat with gpt",
      en: "chat with gpt"
    },
    longDescription: {
      vi: "chat with gpt",
      en: "chat with gpt"
    },
    category: "🤖| AI",
    guide: {
      en: "{pn} 'prompt'\nexample:\n{pn} hi there \nyou can reply to chat\nyou can delete conversations by replying clear"
    }
  },
  onStart: async function () {},
  onChat: async function ({ message, event, args, commandName }) {
    const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
    const prompt = args.join(" ");
    if (!prompt) {
      message.reply(`Please provide some text`);
      return;
    }

    try {
      const uid = event.senderID;
      const response = await axios.get(
        `https://deku-rest-api.gleeze.com/cai/chat?character=squidward&uid=${uid}&q=${encodeURIComponent(prompt)}`
      );

      if (response.data && response.data.result) {
        message.reply(
          {
            body: response.data.result
          },
          (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID
            });
          }
        );
      } else {
        console.error("API Error:", response.data);
        sendErrorMessage(message, "Server not responding ❌");
      }
    } catch (error) {
      console.error("Request Error:", error.message);
      sendErrorMessage(message, "Server not responding ❌");
    }
  },
  onReply: async function ({ message, event, Reply, args }) {
    let { author, commandName } = Reply;
    if (event.senderID !== author) return;
    const prompt = args.join(" ");

    try {
      const uid = event.senderID;
      const response = await axios.get(
        `https://deku-rest-api.gleeze.com/cai/chat?character=squidward&uid=${uid}&q=${encodeURIComponent(prompt)}`
      );

      if (response.data && response.data.result) {
        message.reply(
          {
            body: response.data.result
          },
          (err, info) => {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID
            });
          }
        );
      } else {
        console.error("API Error:", response.data);
        sendErrorMessage(message, "Server not responding ❌");
      }
    } catch (error) {
      console.error("Request Error:", error.message);
      sendErrorMessage(message, "Server not responding ❌");
    }
  }
};

function sendErrorMessage(message, errorMessage) {
  message.reply({ body: errorMessage });
  }