const axios = require('axios');



module.exports = {

  config: {

    name: "kenjaku",

    version: "1.0.0",

    author: "...",

    countDown: 5,

    role: 0,

    shortDescription: {

      vi: "",

      en: "Chat with Kenjaku AI"

    },

    longDescription: {

      vi: "",

      en: ""

    },

    category: "🤖| AI",

    guide: "",

  },



  onStart: async function ({ event, message, getLang, usersData, api, args }) {

    try {

      // Prepare the API URL with the prompt as input

      const prompt = args.join(" ");

      const apiUrl = `https://api.freegpt4.ddns.net/?text=${encodeURIComponent(prompt)}`;



      // Make a GET request to the API to get the completion

      const response = await axios.get(apiUrl);



      // Extract the text response from the API

      let completion = response.data;



      // Replace only asterisks (*) from the text

      completion = completion.replace(/\*/g, '');



      // Replace "bing" with "NEZUKO AI" in the text

      completion = completion.replace(/bing/g, 'KENJAKU AI');

 completion = completion.replace(/Bing/g, 'KENJAKU AI');



      // Reply with the modified text response

      message.reply(completion);

    } catch (error) {

      console.error("Error fetching AI completion:", error.message);

      message.reply("Sorry, an error occurred while processing your request.");

    }

  }

};
