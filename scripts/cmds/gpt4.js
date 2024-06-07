const axios = require("axios");

module.exports = {
  config: {
    name: 'gpt4',
    version: '1.0.1',
    author: 'Null69',
    countDown: 0,
    role: 0,
    category: 'ai',
    shortDescription:"Just an AI",
    guide: "Please provide a prompt:{pn} text. You can reply to every massage.",
  },

  onStart: async function({ api, message, event, args, commandName }) {
    let prompt = args.join(" ");
    
    if (prompt === 'clear') {
        const resetUrl = `https://deku-rest-api-3ijr.onrender.com/gpt4?prompt=clear&uid=${senderID}`;

        try {
            await axios.get(resetUrl);
            message.reply("Conversation reset successfully.");
        } catch (error) {
            console.error(error.message);
            message.reply("An error occurred while resetting the conversation.");
        }
        return;
    }
      const custom = ``;
      let tae = custom + prompt;
    
    if (!prompt) {
      message.reply(this.config.guide);
      return;
    }


    api.setMessageReaction("🟡", event.messageID, () => {}, true);

    const url = `https://deku-rest-api-3ijr.onrender.com/gpt4?prompt=${encodeURIComponent(tae)}&uid=${event.senderID}`;

    try {
      const response = await axios.get(url);
      const result = response.data.gpt4;

      message.reply(`${result}`, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      });

      api.setMessageReaction("🟢", event.messageID, () => {}, true);
    } catch (error) {
      message.reply('An error occurred.');
      api.setMessageReaction("🔴", event.messageID, () => {}, true);
    }
  },

  onReply: async function({ api, message, event, Reply, args }) {
    const prompt = args.join(' ');
      const custom = ``;
      const tubol = custom + prompt;
    const { author, commandName } = Reply;

    if (author !== event.senderID) return; // Check if sender matches

  if (args[0] === 'clear') {
        const resetUrl = `https://deku-rest-api-3ijr.onrender.com/gpt4?prompt=clear&uid=${event.senderID}`;

        try {
            await axios.get(resetUrl);
            message.reply("Conversation reset successfully.");
        } catch (error) {
            console.error(error.message);
            message.reply("An error occurred while resetting the conversation.");
        }

        return;
    }
    api.setMessageReaction("🟡", event.messageID, () => {}, true);

    const url = `https://deku-rest-api-3ijr.onrender.com/gpt4?prompt=${encodeURIComponent(tubol)}&uid=${event.senderID}`;
    
    try {
        const response = await axios.get(url);
        const content = response.data.gpt4;

        message.reply(`${content}`, (err, info) => {
            if (!err) {
                global.GoatBot.onReply.set(info.messageID, {
                    commandName,
                    messageID: info.messageID,
                    author: event.senderID,
                });
            }
        });

        api.setMessageReaction("🟢", event.messageID, () => {}, true);
    } catch (error) {
        console.error(error.message);
        message.reply("An error occurred.");
        api.setMessageReaction("🔴", event.messageID, () => {}, true);
    }
}
};
