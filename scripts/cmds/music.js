async function music({ message, args }) {
  try {
  message.reply({ attachment: await global.utils.getStreamFromURL(`https://jipitiforow-efec7e4faff4.herokuapp.com/ytdl/sing?title=${encodeURIComponent(args.join(" "))}`, `${args.join(" ")}.mp3`)});
  } catch (error) {
    return message.reply(error);
  }
};
module.exports = {
  config: {
    name: "music",
    author: "null69",
    description: "play music",
    category: "media",
    guide: "{pn} title"
  },
  onStart: music
};
