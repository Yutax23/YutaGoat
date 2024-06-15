async function llama({ args, message, getLang, api }) {
  const b = await message.reply(getLang("loading"));
  const query = args.join(" ");
  if (!query) {
    return api.editMessage(getLang("usage", this.config.guide), b.messageID);
  }
  try {
    const a = require('axios');
    const c = await a.get(`https://deku-rest-api-ywad.onrender.com/api/llama-3-70b?q=${encodeURIComponent(query)}`);
    api.editMessage(getLang("answer", c.data.result), b.messageID);
  } catch (error) {
     return api.editMessage(getLang("answer", error));
  }
};

module.exports = {
  config: {
    name: "llama",
		version: "1.1",
		author: "Null69",
		countDown: 5,
		role: 0,
		description: "LLAMA 3 70B",
		category: "ai",
		guide: "Please provide a message\n" + "format: {p}llama question."
  },
  langs: {
    en: {
      answer: "◜llama 3 70b◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      loading: "◜llama 3 70b◞\n━━━━━━━━━━━━━━━━━━\n" + "Please wait a moment...\n━━━━━━━━━━━━━━━━━━",
      usage: "◜llama 3 70b◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid query!\n\n%1\n━━━━━━━━━━━━━━━━━━"
    }
  },
  onStart: llama
};
