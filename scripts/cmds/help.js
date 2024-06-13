const font = require("fontstyles");
const fs = require("fs-extra");

const axios = require("axios");

const path = require("path");

const { getPrefix } = global.utils;

const { commands, aliases } = global.GoatBot;

const doNotDelete = "[ 🐐 | 𝐆𝐨𝐚𝐭𝐁𝐨𝐭 𝐕2 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy



module.exports = {

  config: {

    name: "help",

    version: "1.17",

    author: "NTKhang", // original author Kshitiz 

    countDown: 5,

    role: 0,

    description: {

      en: "View command usage and list all commands directly",

    },

    category: "utility",

    guide: {

      en: "{pn} / help cmdName ",

    },

    priority: 1,

  },



  onStart: async function ({ message, args, event, threadsData, role }) {

    const { threadID } = event;

    const threadData = await threadsData.get(threadID);

    const prefix = getPrefix(threadID);



    if (args.length === 0) {

      const categories = {};
      const botname = "🤍 | SheenaChen";

      let msg = "";



      msg += `╔═══════════╗\n ${font.bold(botname)} \n╚═══════════╝\n┃ Credits: GoatBot V2\n`; // replace with your name 



      for (const [name, value] of commands) {

        if (value.config.role > 1 && role < value.config.role) continue;



        const category = value.config.category || "Uncategorized";

        categories[category] = categories[category] || { commands: [] };

        categories[category].commands.push(name);

      }



      Object.keys(categories).forEach((category) => {

        if (category !== "info") {

          msg += `┏━━━━━━━━━\n┃ ⌜  ${font.bold(category.toUpperCase())}  ⌟\n┃\n`;



          const names = categories[category].commands.sort();

          for (let i = 0; i < names.length; i += 1) {

            const cmds = names.slice(i, i + 1).map((item) => `${item}`);

            msg += `┃・❥・ ${font.monospace(cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length))))}\n`;

          }



          msg += `┗━━━━━━━━━━\n`;

        }

      });



      const totalCommands = commands.size;

      msg += `\n${font.bold("Total Commands:")} ${totalCommands}\n`;

      msg += `${font.bold("Prefix:")} ${prefix}\n`;

      msg += `🐐 | 𝐆𝐨𝐚𝐭𝐁𝐨𝐭 𝐕2`; // its not decoy so change it if you want 



      await message.reply(msg);

    } else {

      const commandName = args[0].toLowerCase();

      const command = commands.get(commandName) || commands.get(aliases.get(commandName));



      if (!command) {

        await message.reply(`Command "${commandName}" not found.`);

      } else {

        const configCommand = command.config;

        const roleText = roleTextToString(configCommand.role);

        const author = configCommand.author || "Unknown";



        const description = configCommand.description ? configCommand.description.en || "No description" : "No description";



        const guideBody = configCommand.guide?.en || "No guide available.";

        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);



        const response = `╭── NAME ────⭓

  │ ${configCommand.name}

  ├── INFO

  │ Description: ${description}

  │ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}

  │ Version: ${configCommand.version || "1.0"}

  │ Role: ${roleText}

  │ Time per command: ${configCommand.countDown || 1}s

  │ Author: ${author}

  ├── Usage

  │ ${usage}

  ├── Notes

  │ The content inside <XXXXX> can be changed

  │ The content inside [a|b|c] is a or b or c

  ╰━━━━━━━❖`;



        await message.reply(response);

      }

    }

  },

};



function roleTextToString(roleText) {

  switch (roleText) {

    case 0:

      return "0 (All users)";

    case 1:

      return "1 (Group administrators)";

    case 2:

      return "2 (Admin bot)";

    default:

      return "Unknown role";

  }

	  }