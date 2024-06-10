async function sv({ message: m, args: a, event: e, }) {
  const k = a.join(" ");
  if (!k) {
    m.reaction("❌", e.messageID, () => {}, true);
    m.reply(this.config.guide);
    return;
  }
  m.reaction("⏱", e.messageID, () => {}, true);
  const axios = require("axios");
  const b = require("yt-search");
  const c = k.split(" ");
  const d = c[0];
  const f = k.substr(c.length + 1);
  const g = await b(f);
  const h = g.videos[0];
  const i = h.url;
  let j;
  try {
    if (d === "-s") {
      m.reply({ attachment: await global.utils.getStreamFromURL(`https://deku-rest-api-3ijr.onrender.com/ytdl?url=${i}&type=mp3`, 'cache')});
    } else if (d === "-v") {
      const { data: result } = await axios.get(`https://for-devs.onrender.com/api/ytdl?url=${i}&apikey=api1`, { responseType: "stream" } );
m.reply({ attachment: result });
    } else if (!d.includes("-")) { return m.reply(this.config.guide); }
    m.reaction("✅", e.messageID, () => {}, true);
  } catch (error) {
    m.reaction("❌", e.messageID, () => {}, true);
    m.reply(`❌ | ${error}`);
  }
};

module.exports = {
  config: {
    name: "sv",
    version: "1.0",
    author: "Null69",
    role: 0,
    countDown: 5,
    description: "play song or video",
    category: "media",
    guide: "⚠ | Please follow this format: {pn} [-s or -v ] title"
  },
  onStart: sv
};