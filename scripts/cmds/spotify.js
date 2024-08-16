async function spotify({ message, args }) {
  try {
    const axios = require("axios");
    const res = await axios.get(`https://hiroshi-rest-api.replit.app/search/spotify?search=${encodeURI(args.join(" "))}`);

    // Assuming the response is an array of tracks
    const track = res.data[0];
    
    if (!track) {
      return message.reply("No results found.");
    }

    const tiny = await global.utils.shortenURL(track.download);
    const att = await global.utils.getStreamFromURL(tiny);
    
    const msg = `🎵 | ${track.name}\n🔗 | [Spotify Link](${track.track})\n📎 | [Download here](${tiny})`;

    await message.send({ 
      body: msg,
      attachment: att
      });
  } catch (error) {
    return message.reply(`An error occurred: ${error.message}`);
  }
};

module.exports = {
  config: {
    name: "spotify",
    author: "null69",
    description: "Play and download music from Spotify",
    category: "spotify downloader",
    guide: "{pn} <song title>"
  },

  onStart: spotify
};