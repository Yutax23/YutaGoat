async function mistral({ args, message, getLang, api }) {
  const b = await message.reply(getLang("loading"));
  const query = args.join(" ");
  if (!query) {
    return api.editMessage(getLang("usage", this.config.guide), b.messageID);
  }
  try {
    const a = require('axios');
    const c = await a.get(`https://joshweb.click/api/mixtral-8b?q=${encodeURIComponent(query)}`);
    api.editMessage(getLang("answer", c.data.result), b.messageID);
  } catch (error) {
     return api.editMessage(getLang("answer", error));
  }
};

module.exports = {
  config: {
    name: "mistral2",
		version: "1.1",
		author: "Null69",
		countDown: 5,
		role: 0,
		description: "Mistral 8B",
		category: "ai",
		guide: "Please provide a message\n" + "format: {p}mistral question."
  },
  langs: {
    en: {
      answer: "◜mistral 8b◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      loading: "◜mistral 8b◞\n━━━━━━━━━━━━━━━━━━\n" + "Please wait a moment...\n━━━━━━━━━━━━━━━━━━",
      usage: "◜mistral 8b◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid query!\n\n%1\n━━━━━━━━━━━━━━━━━━"
    }
  },
  onStart: mistral
};
