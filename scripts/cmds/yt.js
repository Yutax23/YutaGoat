Iasync function yt({ message, args }) {
  try {
  message.reply({ attachment: await global.utils.getStreamFromURL(`https://jipitiforow-efec7e4faff4.herokuapp.com/ytdl/video?title=${encodeURIComponent(args.join(" "))}`, `${args.join(" ")}.mp4`)});
  } catch (error) {
    return message.reply(error);
  }
};
module.exports = {
  config: {
    name: "yt",
    author: "null69",
    description: "play music",
    category: "media",
    guide: "{pn} title"
  },
  onStart: yt
};
                                                                                                                                                                             
