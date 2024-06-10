async function gen({ message, args, event }) {
    const axios = require("axios");
    const text = args.join(" ");
    if (!text.includes("|")) {
      return message.reply(this.config.guide);
    }
    const texts = text.split("|");
    const prompt = texts[0].trim();
    const resolution = texts[1].trim() || "Square";
    const negativePrompt = `lowres, bad quality, jpeg artifacts, bad anatomy, poorly drawn hands, extra limbs, missing limbs, blurry, out of focus, cropped, text, waterkark, signature.`;
    try {
      const loading = await message.reply({ sticker: "387545758037975" });
      message.reaction("😆", loading.messageID, () => {}, true);
    const imageGen = await axios.get(`https://for-devs.onrender.com/api/playgroundai?prompt=${encodeURIComponent(prompt)}&nevPrompt=${encodeURIComponent(negativePrompt)}&resolution=${resolution}&apikey=api1`);
    const result = await global.utils.getStreamFromURL(imageGen.data.imageUrl, 'cache');
    message.reply({ attachment: result });
    message.reaction("✅", event.messageID, () => {}, true);
    message.unsend(loading.messageID);
  }catch (error) {
    return message.reply(`❌ | ${error}`)
  }
};

module.exports = {
  config: {
    name: "gen",
    version: "1",
    author: "null69",
    role: 0,
    countDown: 0,
    description: "generate image.",
    category: "image",
    guide: "This is the format\n{pn} prompt | [Square | Wide | Portrait ]"
  },
  onStart: gen
};