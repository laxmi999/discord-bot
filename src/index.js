//initialize dotenv
require("dotenv").config();

//import discord.js
const { Client, GatewayIntentBits } = require("discord.js");

//create new client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", (c) => {
  // console.log(client.user);
  console.log(`Logged in as ${c.user.tag}!`);
});

// lastly sign in the bot with token
client.login(process.env.CLIENT_TOKEN);

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "hello") {
    message.reply({
      content: "Hi from Bot!",
    });
  }
});
