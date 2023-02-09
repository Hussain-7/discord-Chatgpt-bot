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

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
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

  if (message.author.bot) return;

  switch (content) {
    case "ping":
      message.reply("Pong!");
      break;
    case "what is my avatar":
      message.reply(message.author.displayAvatarURL());
      break;
    case "who are you":
      message.reply("I am a bot created by Hussain Rizvi");
      break;
    case "hi":
      message.reply("Hello!");
      break;
    default:
      // reply from chat gpt-3
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: content,
        max_tokens: 15,
        temperature: 0,
      });
      response.data.choices.forEach((choice) => {
        message.reply(choice.text);
      });
      break;
  }
});

client.login(process.env.BOT_TOKEN);
