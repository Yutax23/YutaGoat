const axios = require('axios');

module.exports = {
  config: {
    name: 'entrans',
    version: '1.0',
    author: 'Null69',
    role: 0,
    category: '🤖| AI',
    shortDescription: {
      en: `Translate into error-free and publishable English.`
    },
    longDescription: {
      en: `Translate into error-free and publishable English.`
    },
    guide: {
      en: '{pn}englishtranslator [query]'
    },
  },

  onStart: async function ({ api, event, args, usersData, message }) {
    try {
      const query = event.messageReply.body;
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("🟡", event.messageID, (err) => console.log(err), true);
        const processingMessage = await message.reply(" Please wait a moment...");

        const apiUrl = `https://liaspark.chatbotcommunity.ltd/@unregistered/api/englishtranslator?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          api.setMessageReaction("🟠", event.messageID, (err) => console.log(err), true);
          await api.editMessage(trimmedMessage, processingMessage.messageID);
          api.setMessageReaction("🟢", event.messageID, (err) => console.log(err), true);

          console.log(`Sent English Translator's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from English Translator API`);
        }

      }
    } catch (error) {
      console.error(`❌ | Failed to get English Translator's response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.editMessage(errorMessage, processingMessage.messageID);
      api.setMessageReaction("🔴", event.messageID, (err) => console.log(err), true);
    }
  },
};
