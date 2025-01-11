require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { OpenAI } = require('openai');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const CHANNELS = ['1290391610906906694']

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

client.on('ready', () => {
    console.log("The bot is online.")
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: "Chat GPT is a friendly chatbot."
            },
            {
                role: 'user',
                content: message.content,
            }
        ]
    }).catch((error) => console.error('OpenAI error: ', error));

    message.reply(response.choices[0].message.content);
});

client.login(process.env.TOKEN);