const { get } = require('axios');
const url = 'https://tools.betabotz.eu.org/tools';

module.exports = {
  config: {
    name: 'openai',
    aliases: [],
    version: '1',
    author: 'Junayd',
    countDown: 0,
    role: 0,
    shortDescription: {
      en: 'Ai',
    },
    longDescription: {
      en: 'Ai',
    },
    category: 'AI',
    guide: {
      en: '{p}openai message / onReply',
    },
  },

  async makeApiRequest(prompt) {
    try {
      const response = await get(`${url}/openai?q=${prompt}`);
      return response.data.result;
    } catch (error) {
      throw error;
    }
  },

  sendMessage(message, body, onReplyCallback) {
    message.reply(
      {
        body: body,
      },
      (err, info) => {
        if (!err) {
          onReplyCallback(info.messageID);
        } else {
          console.error('Error sending message:', err);
        }
      }
    );
  },

  onStart: async function ({ message, args }) {
    try {
      const prompt = args.join(' ');
      const id = message.senderID;

      if (!prompt) {
        this.sendMessage(
          message,
          `Missing input!`,
          (messageID) => {
            global.GoatBot.onReply.set(messageID, {
              commandName: this.config.name,
              messageID,
              author: message.senderID,
              tempFilePath: null,
            });
          }
        );
        return;
      }

      try {
        const result = await this.makeApiRequest(prompt, id);
        this.sendMessage(message, result, (messageID) => {
          global.GoatBot.onReply.set(messageID, {
            commandName: 'openai',
            messageID,
            author: message.senderID,
            tempFilePath: null,
          });
        });
      } catch (error) {
        console.error('Error:', error);
        this.sendMessage(
          message,
          'An error occurred while processing your request.',
          (messageID) => {
            global.GoatBot.onReply.set(messageID, {
              commandName: this.config.name,
              messageID,
              author: message.senderID,
              tempFilePath: null,
            });
          }
        );
      }
    } catch (error) {
      console.error('Error:', error);
      this.sendMessage(
        message,
        error.message,
        (messageID) => {
          global.GoatBot.onReply.set(messageID, {
            commandName: this.config.name,
            messageID,
            author: message.senderID,
            tempFilePath: null,
          });
        }
      );
    }
  },

  onReply: async function ({ message, Reply, args }) {
    const { author, commandName, tempFilePath } = Reply;

    try {
      const prompt = args.join(' ');
      const id = message.senderID;

      if (!prompt) {
        this.sendMessage(
          message,
          `Missing input!`,
          (messageID) => {
            global.GoatBot.onReply.set(messageID, {
              commandName: this.config.name,
              messageID,
              author: message.senderID,
              tempFilePath: null,
            });
          }
        );
        return;
      }

      const result = await this.makeApiRequest(prompt, id);
      this.sendMessage(message, result, (messageID) => {
        global.GoatBot.onReply.set(messageID, {
          commandName: 'openai',
          messageID,
          author: message.senderID,
          tempFilePath: null,
        });
      });
    } catch (error) {
      console.error('Error:', error);
      this.sendMessage(
        message,
        'An error occurred while processing your request.',
        (messageID) => {
          global.GoatBot.onReply.set(messageID, {
            commandName: this.config.name,
            messageID,
            author: message.senderID,
            tempFilePath: null,
          });
        }
      );
    }
  },
};
