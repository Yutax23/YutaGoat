module.exports = {
  config: {
    name: "roulette",
    version: "1.0",
    author: "Null69",
    countDown: 0,
    description: "",
    category: "game",
  },
  langs: {
    en: {
      guess_message: "🎲 |◜Roulette◞\n━━━━━━━━━━━━━━━━━━\nGuess a number between 0 and 36.\n━━━━━━━━━━━━━━━━━━",
      win_message: "🎲 |◜Roulette◞\n━━━━━━━━━━━━━━━━━━\nYou guessed the number You win 50,000.\n━━━━━━━━━━━━━━━━━━",
      lose_message: "🎲 |◜Roulette◞\n━━━━━━━━━━━━━━━━━━\nYou didn't guess the number.\n━━━━━━━━━━━━━━━━━━",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);

    const userGuess = await message.reply(getLang("guess_message"));

    const randomNumber = Math.floor(Math.random() * 37);
    const winnings = calculateWinnings(randomNumber, userGuess);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(randomNumber, userGuess, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(randomNumber, userGuess) {
  if (randomNumber === parseInt(userGuess)) {
    return 50000;
  } else {
    return 0;
  }
}

function getSpinResultMessage(randomNumber, userGuess, winnings, getLang) {
  if (winnings > 0) {
    return getLang("win_message") + `\nThe number was ${randomNumber}. Your guess was ${userGuess}.`;
  } else {
    return getLang("lose_message") + `\nThe number was ${randomNumber}. Your guess was ${userGuess}.`;
  }
};