const axios = require("axios");
const font = require("fontstyles");
module.exports = {
	config: {
		name: 'blackbox',
		version: '2.1.0',
		author: 'KENLIEPLAYS',
		countDown: 5,
		role: 0,
		shortDescription: 'Blackbox by Kenlie Navacilla Jugarap',
		longDescription: {
			en: 'Blackbox by Kenlie Navacilla Jugarap'
		},
		category: '🤖| AI',
		guide: {
			en: '   {pn} <word>: ask with Blackbox'
				+ '\n   Example:{pn} hi'
		}
	},

	langs: {
		en: {
			chatting: 'Please wait...',
			error: 'If this report spam please contact Kenlie Navacilla Jugarap'
		}
	},

	onStart: async function ({ args, message, event, getLang }) {
		if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				const rapjuga = `Is this answer helpful to you? Kindly click the link below
https://click2donate.kenliejugarap.com
(Clicking the link and clicking any ads or button and wait for 30 seconds (3 times) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future)`;
				const lieken = responseMessage.replace(rapjuga, "");
	
	function applyBoldToText(sukuna) {
    const boldRegex = /\*\*(.*?)\*\*/g;
    return sukuna.replace(boldRegex, (match, text) => font.bold(text));
}

const modifiedResponse = applyBoldToText(lieken);
				return message.reply(`${modifiedResponse}`);
			}
			catch (err) {
				console.log(err)
				return message.reply(getLang("error"));
			}
		}
	},
};

async function getMessage(yourMessage, langCode) {
	try {
		const res = await axios.get(`https://api.kenliejugarap.com/blackbox/?text=${yourMessage}`);
		if (!res.data.response) {
			throw new Error('Please contact Kenlie Navacilla Jugarap if this error spams...');
		}
		return res.data.response;
	} catch (err) {
		console.error('Error while getting a message:', err);
		throw err;
	}
}
