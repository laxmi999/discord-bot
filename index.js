//initialize dotenv
// const dotenv = require("dotenv");
// dotenv.config();

require("dotenv").config();

//import discord.js
const Discord = require("discord.js");

//create new client
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// lastly sign in the bot with token
client.login(process.env.CLIENT_TOKEN);
