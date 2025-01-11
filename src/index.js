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

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

client.on('ready', () => {
    console.log("The bot is online.")
});

client.login(process.env.TOKEN);