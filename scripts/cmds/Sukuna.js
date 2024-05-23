const axios = require("axios");
const Prefixes = [
  'sukuna',
  'Sukuna'
];

module.exports = {
  config: {
    name: "Sukuna",
    version: "1.0",
    author: "Rishad",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "chat with Sukuna",
      en: "chat with Sukuna"
    },
    longDescription: {
      vi: "chat with Sukuna",
      en: "chat with Sukuna"
    },
    category: "chat",
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
        `https://for-devs.onrender.com/api/bard?query=${encodeURIComponent(prompt)}&UID=${uid}&apikey=api1`
      );

      if (response.data && response.data.response.message) {
        const x = "Gemini 1.0 Pro"
        const a = response.data.response.message
        let answer = a.replace(x, 'Sukuna Ai');
        answer = answer.replace(/\*/g, '');
        message.reply(
          {
            body: answer
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
        `https://for-devs.onrender.com/api/bard?query=${encodeURIComponent(prompt)}&UID=${uid}&apikey=api1`
      );

      if (response.data && response.data.response.message) {
        const b = response.data.response.message
        const y = "Gemini 1.0 Pro";
        let sagot = b.replace(y, 'Sukuna Ai');
        sagot = sagot.replace(/\*/g, '');
        message.reply(
          {
            body: sagot
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
