const a = require("axios");
const b = require("fs-extra");
const c = require("path");
const d = require("ytdl-core");
const e = require("yt-search");

async function f({ message: g, event: h, args: i, api: j }) {
  g.reaction("⏱️", h.messageID, () => {}, true);
  const k = i.join(" ");
  if (!k) {
  return g.reply(this.config.guide);
  }
  let [l, ...m] = k.split(" ");
  m = m.join(" ");
  const n = await e(m);
  if (!n.videos.length) {
    return g.reply(`${m} not found!`)
  }
  const o = n.videos[0];
  const p = o.url;
  let q;
  let r;
  let s;
  let t;
  if (l === "-v") {
    t = await d(p, { filter: "audioandvideo" });
    g.reaction("🎥", h.messageID, () => {}, true);
    q = `${m}_${Date.now()}.mp4`;
    r = c.join(__dirname, "cache", q);
    s = b.createWriteStream(r);
  t.pipe(s);
  s.on("finish", async () => {
    try {
      const u = b.createReadStream(r);
      await g.reply({ attachment: u });
      g.reaction("✅", h.messageID, () => {}, true);
    } catch (error) {
      g.reaction("❌", h.messageID, () => {}, true);
      g.reply(`${error}`);
    } finally {
      await b.unlink(r);
    }
  });
  return;
  } else if (l === "-s") {
    t = await d(p, { filter: "audioonly" });
    g.reaction("🎶", h.messageID, () => {}, true);
    q = `${m}_${Date.now()}.mp3`;
    r = c.join(__dirname, "cache", q);
    s = b.createWriteStream(r);
  t.pipe(s);
  s.on("finish", async () => {
    try {
      const u = b.createReadStream(r);
      await g.reply({ attachment: u });
      g.reaction("✅", h.messageID, () => {}, true);
    } catch (error) {
      g.reaction("❌", h.messageID, () => {}, true);
      g.reply(`${error}`);
    } finally {
      g.reaction("✅", h.messageID, () => {}, true);
      await b.unlink(r);
    }
  });

  } else { return g.reply(`Please choose between -s and -v\nFormat: ${this.config.guide}`);
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
    guide: "⚠ | Please follow this format: sv [ -s or -v ] title"
  },
  onStart: f
};

const { GoatWrapper } = require('fca-liane-utils');
const wrapper = new GoatWrapper(module.exports);

wrapper.applyNoPrefix();
