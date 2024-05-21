const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "1wPreL2-CYkk1ww6PLmU7VyZsrZvAyj7_oreG4ETVSbQbEBive1qoll_L68WWNbja5iWZwL78JwKVhoGuQlOrIlVtgTGVoitozPbUjYYP3anZXMN03eL3lwtvrM8f5oIyuM4o97mNyDAjPKWMNNpJMqP4kjhys34O3urszmUwVyKF5XiC65CR2PtXQw9PtRtnujyS_L7Dzpg4m0nO1oHEkfVrPy-fjUdylGFouWws5lI";
const _U = "1wPreL2-CYkk1ww6PLmU7VyZsrZvAyj7_oreG4ETVSbQbEBive1qoll_L68WWNbja5iWZwL78JwKVhoGuQlOrIlVtgTGVoitozPbUjYYP3anZXMN03eL3lwtvrM8f5oIyuM4o97mNyDAjPKWMNNpJMqP4kjhys34O3urszmUwVyKF5XiC65CR2PtXQw9PtRtnujyS_L7Dzpg4m0nO1oHEkfVrPy-fjUdylGFouWws5lI";

module.exports = {
  config: {
    name: "dalle",
    version: "1.0.2",
    author: "Samir Œ ",
    role: 0,
    countDown: 5,
    shortDescription: { en: "dalle3 image generator" },
    longDescription: { en: "dalle3 is a image generator powdered by OpenAi" },
    category: "IMAGE",
    guide: { en: "{prefix}dalle <search query>" }
  },

  onStart: async function ({ api, event, args }) {
    const prompt = args.join(" ");

    try {
      const res = await axios.get(`https://apis-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(prompt)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("response received but imgurl are missing ", event.threadID, event.messageID);
        return;
      }

      const imgData = [];

      for (let i = 0; i < Math.min(4, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `Here's your generated image`
      }, event.threadID, event.messageID);

    } catch (error) {
      api.sendMessage("Can't Full Fill this request ", event.threadID, event.messageID);
    }
  }
};
