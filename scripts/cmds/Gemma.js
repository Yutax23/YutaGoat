const axios = require('axios');



module.exports = {

  config: {

    name: 'gemma',

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

      en: '{pn}gemma [query]'

    },

  },



  onStart: async function ({ api, event, args, message }) {

    try {

      const query = args.join(" ") || "hello";

            if (query) {

        api.setMessageReaction("🟡", event.messageID, (err) => console.log(err), true);

        

        const apiUrl = `https://api.easy-api.online/ai/gemma?q=${encodeURIComponent(query)}`;

        const response = await axios.get(apiUrl);



        if (response.data && response.data.content) {

          let trimmedMessage = response.data.content.trim();

          trimmedMessage = trimmedMessage.replace(/\*/g, '');

          api.setMessageReaction("🟠", event.messageID, (err) => console.log(err), true);

          

          await message.reply(trimmedMessage);

          api.setMessageReaction("🟢", event.messageID, (err) => console.log(err), true);



          console.log(`Sent Gemma's response to the user`);

        } else {

          throw new Error(`Invalid or missing response from Gemma API`);

        }



      }

    } catch (error) {

      console.error(`❌ | Failed to get Gemma's response: ${error.message}`);

      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;

      await message.reply(errorMessage);

      api.setMessageReaction("🔴", event.messageID, (err) => console.log(err), true);

    }

  },

};
