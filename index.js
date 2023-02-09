const { Client, GatewayIntentBits } = require("discord.js");
console.log("GatewayIntentBits: ", GatewayIntentBits);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
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
  console.log("Message registered!");
});

client.login(process.env.BOT_TOKEN);
