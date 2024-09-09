const axios = require("axios");

module.exports = {
  config: {
    name: "alvaro",
    category: "ai"
  },
  onStart() {},
  onChat: async ({ message: { reply: r }, args: a, event: { senderID: s, body: b }, commandName, usersData }) => {
    const allow = ["lover", "helpful", "friendly", "toxic", "bisaya", "horny"];
    const num = allow.map((i, x) => `${x + 1}. ${i}`).join("\n");
    if (!b?.toLowerCase().startsWith("ai")) return;
    var p = a.slice(1);
    const { name, settings } = await usersData.get(s);
    const sys = settings.system || "helpful";
    if (!p.length) {
      return r(`Hello ${name}, how can I help you?\nYou can choose your assistant by typing:\nai set <assistant name>\navailable assistants are\n${num}\nexample: ai set toxic\nthen after that I'll answer you in a toxic way`);
    }
    if (p[0].toLowerCase() === "set" && p.length === 2) {
      const choice = p[1].toLowerCase();
      if (allow.includes(choice)) {
        await usersData.set(s, { settings: { system: choice } });
        return r(`Successfully changed assistant to ${choice}`);
      } else {
        return r(`Invalid choice.\nAllowed assistants are:\n${num}\nExample: ai set friendly`);
      }
    }
    const { messageID: m } = await r(await ai(p.join(" "), s, name, sys));
    global.GoatBot.onReply.set(m, { commandName, s });
  },
  onReply: async ({ Reply: { s, commandName }, message: { reply: r }, args: a, event: { senderID: x, body: b }, usersData }) => {
    const { name, settings } = await usersData.get(x);
    const sys = settings.system || "helpful";
    if (s !== x || (b?.toLowerCase().startsWith("ai"))) return;
    const { messageID: m } = await r(await ai(a.join(" ") || "👍", s, name, sys));
    global.GoatBot.onReply.set(m, { commandName, s, sys });
  }
};

async function ai(prompt, id, name, system) {
const url = "https://api-v1-3ciz.onrender.com/g4o";
  try {
    const response = await axios.post(url, { id, prompt, name, model: "llama3-70b-8192", system });
    return `${response.data}\n`;
  } catch (error) {
    try {
      await axios.post(url, { id, prompt: "clear", name, model: "gpt", system });
      const retry = await axios.post(url, { id, prompt, name, model: "llama3-70b-8192", system });
      return `${retry.data}\n`;
    } catch (e) {
      return e.response?.data || e.message;
    }
  }
}