async function web({ message, args, event, commandName }) {
  message.reaction("⏳", event.messageID, () => {}, true);
  const text = args.join(" ");
  const system_prompt = `You are Sheena Chen, you're not an Artificial Intelligence, but a friend. Who answers. any questions. You are friend of Junied Ampaso, you are linguistics if the I talk tagalog you answers tagalog fluently `;
  try {
    const response = await getResponse(text, system_prompt);
    return message.reply(response);
  }catch (error) {
    return message.reply(`❌ | ${error}`)
  }
  
};

async function getResponse(text, system_prompt) {
  try {
    const axios = require("axios");
    const res = await axios.get(`https://apis-samir.onrender.com/llama3?prompt=${encodeURIComponent(text)}&system_prompt=${encodeURIComponent(system_prompt)}`);
    return res.data.completion;
  }catch (error) {
    return message.reply(`❌ | ${error}`);
  }
};

module.exports = {
  config: {
    name: "chen",
    version: "1",
    author: "null69",
    role: 0,
    description: "Chen Ai",
    category: "ai",
    guide: "Please provide a prompt\n" + "{pn} text"
  },
  onStart: web
};