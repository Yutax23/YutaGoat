async function neuronspike({ args, message, getLang, api }) {
  const b = await message.reply(getLang("loading"));
  const query = args.join(" ");
  if (!query) {
    return api.editMessage(getLang("usage", this.config.guide), b.messageID);
  }
  try {
    const a = require('axios');
    const c = await a.get(`https://deku-rest-api-ywad.onrender.com/api/neuronspike?q=${encodeURIComponent(query)}`);
    api.editMessage(getLang("answer", c.data.result), b.messageID);
  } catch (error) {
     return api.editMessage(getLang("answer", error));
  }
};

module.exports = {
  config: {
    name: "neuronspike",
		version: "1.1",
		author: "Null69",
		countDown: 5,
		role: 0,
		description: "neuronspike",
		category: "ai",
		guide: "Please provide a message\n" + "format: {p}neuronspike question."
  },
  langs: {
    en: {
      answer: "◜neuronspike◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      loading: "◜neuronspike◞\n━━━━━━━━━━━━━━━━━━\n" + "Please wait a moment...\n━━━━━━━━━━━━━━━━━━",
      usage: "◜neuronspike◞\n━━━━━━━━━━━━━━━━━━\n" + "❌ | Invalid query!\n\n%1\n━━━━━━━━━━━━━━━━━━"
    }
  },
  onStart: neuronspike
};
