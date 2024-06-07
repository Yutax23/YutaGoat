async function sv({ args, message, event }) {
    const a = require("yt-search");
    const yeah = args.join(" ");
    const text = yeah.split("|");
    if (!yeah.includes("|")) {
      message.reaction("❌", event.messageID, () => {}, true);
      await message.reply(this.config.guide);
      return;
    }
    const title = text[1].trim();
    const media = text[0].trim();
    if (media === "-s") {
      message.reaction("⏱️", event.messageID, () => {}, true);
      const song = await a(title);
      const sing = song.videos[0];
      const songUrl = sing.url;
      const downloadSong = await global.utils.getStreamFromURL(`https://deku-rest-api-3ijr.onrender.com/ytdl?url=${songUrl}&type=mp3`);
      downloadSong.path = "./cache/null69.mp3"
      message.reply({ attachment: downloadSong });
      message.reaction("✅", event.messageID, () => {}, true);
    } else if (media === "-v") {
      message.reaction("⏱️", event.messageID, () => {}, true);
      const video = await a(title);
      const vid = video.videos[0];
      const videoUrl = vid.url;
      const downloadVideo = await global.utils.getStreamFromURL(`https://deku-rest-api-3ijr.onrender.com/ytdl?url=${videoUrl}&type=mp4`);
      downloadVideo.path = "./cache/null69.mp4"
      message.reply({ attachment: downloadVideo });
      message.reaction("✅", event.messageID, () => {}, true);
    } else return message.reply("Please choose between mp3 or mp4");
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
    guide: "Please follow this format: {pn} [title] - [mp3 | mp4]"
  },
  onStart: sv
};
