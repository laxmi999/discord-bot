require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const roles = [
  {
    id: "1217115275711741982",
    label: "Red",
  },
  {
    id: "1217115648967180298",
    label: "Purple",
  },
  {
    id: "1217115845868912731",
    label: "Yellow",
  },
];

client.on("ready", async () => {
  try {
    console.log(`Logged in as ${client.user.tag}!`);
    const channel = await client.channels.cache.get("1215631898311786517");
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: "Claim or remove a role below:",
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
