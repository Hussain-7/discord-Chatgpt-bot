const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
});

require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.content === "ping") {
    message.channel.send("Pong!");
  }
});

client.on("messageCreate", async (message) => {
  console.log("Message registered!", message.content);
  const { content } = message;
  if (content === "ping") {
    message.reply("Pong!");
  }
});

client.login(process.env.BOT_TOKEN);
