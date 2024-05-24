const x = require('axios');
const f = require ("fontstyles");
const y = `https://deku-rest-api-3ijr.onrender.com`;

module.exports = {
	config: {
		name: "bard",
		version: "1.0",
		author: "Null69",
		countDown: 5,
		role: 0,
		description: "Ask Gemini Pro",
		category: "🤖| AI",
		guide: "pn text"
	},

	onStart: async function ({ message: m, event: e, args: a }) {
	  const p = a.join("");
	  if (!p) {
	    m.reaction("🟠", e.messageID);
	    return m.reply(f.monospace("Please provide a message."));
	  }
	  else {
	    m.reaction("🟡", e.messageID);
	    const r = await x.get(`${y}/new/gemini?prompt=${encodeURIComponent(p)}`);
	    const s = r.data.result.data;
	    const t = s.replace(/\*/g, "");
	    m.reply(f.monospace(t));
	    m.reaction("🟢", e.messageID);
	  }
	}
};
