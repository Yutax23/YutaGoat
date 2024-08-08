async function gemma({ args, message, getLang, api }) {
  const b = await message.reply(getLang("loading"));
  const query = args.join(" ");
  if (!query) {
    return api.editMessage(getLang("usage", this.config.guide), b.messageID);
  }
  try {
    const a = require('axios');
    const c = await a.get(`https://haze-claude-api-c56bb0cd1fe4.herokuapp.com/claude?q=${encodeURIComponent(query)}`);
    api.editMessage(getLang("answer", c.data.response.text), b.messageID);
  } catch (error) {
     return api.editMessage(getLang("answer", error));
  }
};

module.exports = {
  config: {
    name: "ai",
                version: "1.1",
                author: "Null69",
                countDown: 5,
                role: 0,
                description: "Claude",
                category: "ai",
                guide: "Please provide a message\n" + "format: {p}gemma question."
  },
  langs: {
    en: {
      answer: "◜Claude◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      loading: "◜Claude◞\n━━━━━━━━━━━━━━━━━━\n" + "Please wait a moment...\n━━━━━━━━━━━━━━━━━━",
      usage: "◜Claude◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid query!\n\n%1\n━━━━━━━━━━━━━━━━━━"
    }
  },
  onStart: gemma
};