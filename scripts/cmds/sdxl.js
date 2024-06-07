const axios = require("axios");

async function sdxl({ event, message, args }) {
  try {
  const prompt = args.join(" ");
  if (prompt === "list") {
    message.reaction("🤍", event.messageID, () => {}, true);
    const styles = `
    Here's your, SDXL Style list:
    1. anime
    2. fantasy
    3. pencil
    4. digital
    5. vintage
    6. 3D
    7..cyberpunk
    8. manga
    9. realistic
    10. demonic
    11. heavenly
    12. comic
    13. robotic
    `;
    message.reply(styles);
    return;
  } else if (!prompt.includes("|")) {
    return message.reply(this.config.guide);
  }
  const sdxl = prompt.split("|");
  const text = sdxl[0].trim();
  const model = sdxl[1].trim();
  message.reaction("⏱️", event.messageID, () => {}, true);
  const { data: image } = await axios.get(`https://deku-rest-api-3ijr.onrender.com/sdxl?q=${encodeURIComponent(prompt)}&style=${model}`, { responseType: "stream" } );
  
  if (image) {
  message.reply({ attachment: image });
  await message.reaction("✅", event.messageID, () => {}, true);
  }
  }catch (error) {
    message.reaction("❌", event.messageID, () => {}, true);
    message.reply("an error occured. try again later.");
  }
};

module.exports = {
  config: {
    name: "sdxl",
    version: "1.0",
    author: "null69",
    description: "sdxl generate image",
    category: "image",
    role: 0,
    countDown: 5,
    guide: "{pn} prompt | style [1-13]\nFor style list: {pn} list"
  },
  onStart: sdxl
};
