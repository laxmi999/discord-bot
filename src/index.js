//initialize dotenv
require("dotenv").config();

//import discord.js
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

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

// For slash commands
client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`The sum is ${num1 + num2}.`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("This is the title.")
      .setDescription("This is the description.")
      .setColor("Random")
      .addFields(
        { name: "Field Title 1", value: "Random value", inline: true },
        { name: "Field Title 1", value: "Random value", inline: true }
      );

    interaction.reply({ embeds: [embed] });
  }
});

// For chats?
client.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("This is the title.")
      .setDescription("This is the description.")
      .setColor("Random")
      .addFields(
        { name: "Field Title 1", value: "Random value", inline: true },
        { name: "Field Title 1", value: "Random value", inline: true }
      );

    //for embed command
    // message.reply({ embeds: [embed] });
    message.channel.send({ embeds: [embed] });
  }
});

// lastly sign in the bot with token
client.login(process.env.TOKEN);
