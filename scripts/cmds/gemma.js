async function gemma({ args, message, getLang, api }) {
  const b = await message.reply(getLang("loading"));
  const query = args.join(" ");
  if (!query) {
    return api.editMessage(getLang("usage", this.config.guide), b.messageID);
  }
  try {
    const a = require('axios');
    const c = await a.get(`https://joshweb.click/api/gemma-7b?q=${encodeURIComponent(query)}`);
    api.editMessage(getLang("answer", c.data.result), b.messageID);
  } catch (error) {
     return api.editMessage(getLang("answer", error));
  }
};

module.exports = {
  config: {
    name: "gemma",
		version: "1.1",
		author: "Null69",
		countDown: 5,
		role: 0,
		description: "Gemma 7B",
		category: "ai",
		guide: "Please provide a message\n" + "format: {p}gemma question."
  },
  langs: {
    en: {
      answer: "◜gemma 7b◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      loading: "◜gemma 7b◞\n━━━━━━━━━━━━━━━━━━\n" + "Please wait a moment...\n━━━━━━━━━━━━━━━━━━",
      usage: "◜gemma 7b◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid query!\n\n%1\n━━━━━━━━━━━━━━━━━━"
    }
  },
  onStart: gemma
};
