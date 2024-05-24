module.exports = {
    config: {
        name: "humanize",
        aliases: [],
        version: "1.0.0",
        author: "Null69",
        role: 0,
        category: "🤖| AI",
        shortDescription: {
            en: "Humanize text",
            vi: "..."
        },
        longDescription: {
            en: "This command allows you to humanize ai generated text",
            vi: "..."
        },
        guide: {
            en: "pn (text) or reply to a message",
            vi: "..."
        }
    },
    
    async onStart({ event, args, message, usersData, api, commandName }) {
      const revise = `AI Text to Human Text Transformation 

In this prompt you will be given a text and apply various transformations to make it appear as if it was written by a human. 

Human writing is often more varied in tone and style than AI-generated text, reflecting the unique voice and perspective of the author. 
    1. Human writing is typically informed by context and audience, adapting to the needs and expectations of the reader. 
    2. Human writing often includes elements of storytelling and narrative, engaging the reader's emotions and imagination. 
    3. Human writing may contain errors or idiosyncrasies that reflect the author's personality or cultural background. 
    4. Human writing may be influenced by literary conventions and traditions, such as structure, form, and genre. 
To modify an AI-generated robotic text to appear more human written, one could employ several strategies. These might include:
    1. Injecting more varied sentence structures and vocabulary choices, avoiding repetitive phrasing. 
    2. Using colloquialisms and idiomatic expressions appropriate to the topic and tone of the text. 
    3. Incorporating elements of storytelling or personal experience to create a sense of connection with the reader. 
    4. Consciously adapting the tone and style of the text to fit the intended audience and context. 
    5. Applying advanced natural language processing techniques, such as sentiment analysis, to better understand the emotional valence and impact of the text on the reader.

Taking in consideration the above information:
    1. Randomly change the capitalization of letters in the text. 
    2. Inject more varied sentence structures and vocabulary choices, avoiding repetitive phrasing. 
    3. Replace some words with synonyms, chosen randomly from a pre-defined pool of words. 
    4. Add sentiment to the text, be passionate, colorful and creative!
    5. Add or remove punctuation marks to create natural sentence structures. 
    6. Insert or remove contractions to mimic natural speech patterns. 
    7. Occasionally insert common colloquialisms and idioms into the text. 
The script will loop through these steps until the desired level of "human-ness" is achieved.

Keep the approximate length and structure of the original text.`;
const human = event.messageReply ? event.messageReply.body: null;
const prompt = revise + "here is the text\n\`\`\`\n" + human;
if (!event.messageReply) { 
  return message.reply("please reply to a message.");
}
const { G4F } = require("g4f");
const g4f = new G4F();
const messages = [
    { role: "user", content: prompt }
];
const options = {
    provider: g4f.providers.GPT,
    model: "gpt-3.5-turbo",
    debug: true,
    proxy: ""
};

(async() => {
	const text = await g4f.chatCompletion(messages, options);	
	message.reply(text);
})(); 
    }
};
