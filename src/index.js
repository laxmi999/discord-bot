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

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`The sum is ${num1 + num2}.`);
  }
});

// lastly sign in the bot with token
client.login(process.env.TOKEN);
