module.exports.config = {
  name: "shoti",
	version: "2.0",
	author: "Null69",
	countDown: 15,
	role: 0,
	description:"random girl tiktok",
	category: "fun",
	guide: "{pn}"
};

module.exports.onStart = async function ({ message: m, event: e }) {
m.reaction("⏱", e.messageID, () => {}, true);
const a = require("axios");
const b = await a.get(`https://shoti-srv2-itslibyzxy0.koyeb.app/api/v1/request-f`);
const c = await global.utils.getStreamFromURL(b.data.data.url);
const d = `🌸| Random Girl\n\nusername: ${b.data.data.user.username}\nnickname: ${b.data.data.user.nickname}\nuserid:${b.data.data.user.userID}`;

m.reply({ body: d, attachment: c });
await m.reaction("✅", e.messageID, () => {}, true);

}
