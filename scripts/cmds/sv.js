async function sv({ message: m, args: a, event: e, }) {
  const k = a.join(" ");
  if (!k) {
    m.reaction("❌", e.messageID, () => {}, true);
    m.reply(this.config.guide);
    return;
  }
  m.reaction("⏱", e.messageID, () => {}, true);
  const b = require("yt-search");
  let [d, ...f] = k.split(" ");
  f = f.join(" ");
  if (!f)
  return m.reply(this.config.guide);
  const g = await b(f);
  const h = g.videos[0];
  const i = h.url;
  try {
    switch (d) {
    case "-s":
    case "sing": {
      m.reply({ attachment: await global.utils.getStreamFromURL(`https://deku-rest-api-3ijr.onrender.com/ytdl?url=${i}&type=mp3`, 'cache')});
    m.reaction("✅", e.messageID, () => {}, true);
return;

    }
    case "-v":
    case "video": {
      m.reply({ attachment: await global.utils.getStreamFromURL(`https://deku-rest-api-3ijr.onrender.com/ytdl?url=${i}&type=mp4`, 'cache')});
    m.reaction("✅", e.messageID, () => {}, true);
return;
    }
    default: {
      if (!d) { return m.reply(this.config.guide); }
    }
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
    guide: "⚠ | Please follow this format: sv [-s/sing or -v/video ] title"
  },
  onStart: sv
};

const { GoatWrapper } = require('fca-liane-utils');
const wrapper = new GoatWrapper(module.exports);

wrapper.applyNoPrefix();
