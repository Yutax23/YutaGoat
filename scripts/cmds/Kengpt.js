const axios = require('axios');

module.exports = {
  config: {
    name: 'kengpt',
    version: '1.0',
    author: 'Null69',
    role: 0,
    category: 'AI',
    shortDescription: {
      en: `Just an AI`
    },
    longDescription: {
      en: `Just an AI Nothing special.`
    },
    guide: {
      en: '{pn}kengpt [query]'
    },
  },

  onStart: async function ({ api, event, args, usersData, message }) {
    try {
      const query = args.join(" ") || "hello";
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("🟡", event.messageID, (err) => console.log(err), true);
        
        const apiUrl = `https://liaspark.chatbotcommunity.ltd/@unregistered/api/bestgpt?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          let trimmedMessage = response.data.message.trim();
          api.setMessageReaction("🟠", event.messageID, (err) => console.log(err), true);
          trimmedMessage = trimmedMessage.replace(/BestGpt/g, 'Ken GPT');
          trimmedMessage = trimmedMessage.replace(/best GPT/g, 'Ken GPT');
          trimmedMessage = trimmedMessage.replace(/BEST ChatGPT/g, 'Ken GPT');
          trimmedMessage = trimmedMessage.replace(/BestGpt/g, 'Ken GPT');
          const mod = `
𝚃𝚑𝚒𝚜 𝚒𝚜 𝚝𝚑𝚎 𝙱𝙴𝚂𝚃 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 𝙼𝚘𝚍𝚎𝚕 𝚊𝚗𝚍 𝚝𝚑𝚊𝚗𝚔𝚜 𝚏𝚘𝚛 𝚞𝚜𝚒𝚗𝚐.

𝙵𝚘𝚕𝚕𝚘𝚠:
facebook.com/nealiana.kaye.cagara`;
          trimmedMessage = trimmedMessage.replace(mod, 'Ken GPT');
          await message.reply(trimmedMessage);
          api.setMessageReaction("🟢", event.messageID, (err) => console.log(err), true);

          console.log(`Sent Kengpt's response to the user`);
        } else {
          throw new Error(`Invalid or missing response from Kengpt API`);
        }

      }
    } catch (error) {
      console.error(`❌ | Failed to get Kengpt's response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      await message.reply(errorMessage);
      api.setMessageReaction("🔴", event.messageID, (err) => console.log(err), true);
    }
  },
};
