async function codestral({ args, message, getLang, api }) {
  const b = await message.reply(getLang("loading"));
  const query = args.join(" ") || "gimme random programming joke.";
  try {
    const a = require('axios');
    const c = await a.get(`https://deku-rest-api-ywad.onrender.com/api/codestral?q=${encodeURIComponent(query)}`);
    api.editMessage(getLang("answer", c.data.result), b.messageID);
  } catch (error) {
     return api.editMessage(getLang("answer", error));
  }
};

module.exports = {
  config: {
    name: "codestral",
		version: "1.1",
		author: "Null69",
		countDown: 5,
		role: 0,
		description: "codestral",
		category: "ai",
		guide: "Please provide a message\n" + "format: {p}palm question."
  },
  langs: {
    en: {
      answer: "◜codestral◞\n━━━━━━━━━━━━━━━━━━\n" + "%1\n━━━━━━━━━━━━━━━━━━",
      loading: "◜codestral◞\n━━━━━━━━━━━━━━━━━━\n" + "Please wait a moment...\n━━━━━━━━━━━━━━━━━━"
    }
  },
  onStart: codestral
};