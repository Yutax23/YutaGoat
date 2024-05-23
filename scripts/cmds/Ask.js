const axios = require('axios');

const Prefixes = [
  'ken',
  'ask',
  'Ask'
];

module.exports = {
  config: {
    name: 'ask',
    version: '2.6.2',
    author: 'JV Barcenas | Shikaki', // do not change
    role: 0,
    category: '🤖| AI',
    shortDescription: {
      en: 'Asks AI for an answer.',
    },
    longDescription: {
      en: 'Asks AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; 
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply(
          "Kindly provide the question at your convenience and I shall strive to deliver an effective response. Your satisfaction is my top priority."
        );
        return;
      }

      api.setMessageReaction("⌛", event.messageID, () => { }, true);

      let updatedPrompt = ``;
      const response = await axios.get(`https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(updatedPrompt)}&uid=${event.senderID}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.response;

      await message.reply(messageText);

      api.setMessageReaction("✅", event.messageID, () => { }, true);
    } catch (error) {
      message.reply(`Failed to get answer: ${error.message}`);
    }
  },
};
