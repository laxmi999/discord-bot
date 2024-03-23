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

// // For slash commands
client.on("interactionCreate", (interaction) => {
  console.log("inside slash function");
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("Hello from Bot!");
  }

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

// // For chats?
// client.on("messageCreate", (message) => {
//   if (message.content === "embed") {
//     console.log("embed");
//     const embed = new EmbedBuilder()
//       .setTitle("This is the title.")
//       .setDescription("This is the description.")
//       .setColor("Random")
//       .addFields(
//         { name: "Field Title 1", value: "Random value", inline: true },
//         { name: "Field Title 1", value: "Random value", inline: true }
//       );

//     //for embed command
//     // message.reply({ embeds: [embed] });
//     message.channel.send({ embeds: [embed] });
//   }
// });

client.on("interactionCreate", async (interaction) => {
  console.log("inside button function");
  try {
    if (!interaction.isButton()) return;
    // await interaction.deferReply({ ephemeral: true });
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.reply({
        content: "I couldn't find that role.",
        // ephemeral: true,
      });
      return;
    }

    // Fetch the bot's member in the guild
    const botMember = await interaction.guild.members.fetch(client.user.id);

    const hasRole = botMember.roles.cache.has(role.id);

    if (hasRole) {
      await botMember.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed.`);
      return;
    }
    await botMember.roles.add(role);
    await interaction.editReply(`The role ${role} has been added.`);
  } catch (error) {
    console.log(error);
  }
});

// lastly sign in the bot with token
client.login(process.env.TOKEN);
