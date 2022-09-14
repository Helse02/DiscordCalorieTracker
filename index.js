//------------------------INITIALIZATION-------------------------------------
const Discord = require("discord.js");
const fs = require("fs");
const { Client, GatewayIntentBits, ActivityType, Routes } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { REST } = require('@discordjs/rest');

const db = require("./utilities/sql.js");
const sql = require("sqlite3");
const path = require("path");
const config = require("./config.json");
const { timeStamp } = require("console");
const { setDefaultResultOrder } = require("dns");
const { channel } = require("diagnostics_channel");

const globals = require("./utilities/globals.js");
const { timeEmojis } = require('./utilities/functions.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const token = config.token;
const prefix = config.prefix;
const channelID = config.channel;
const guildID = config.guildID;
const clientID = config.clientID;

client.login(token);

client.commands = new Discord.Collection();

const files = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
const commands = [];

for (const file of files) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
  const commandsToString = JSON.stringify(commands);
  fs.writeFile('./utilities/commands.json', commandsToString, (e, res) => {
    if (e) console.log('ERROR: ' + e);
  });
}

client.once("ready", () => {
  // Alternatively, you can set the activity to any of the following:
  // PLAYING, STREAMING, LISTENING, WATCHING
  client.user.setPresence({
    activities: [{ name: `Calories`, type: ActivityType.Watching }],
    status: "dnd",
  });

  var currentDate = new Date();
  console.log(`Ready ${currentDate.toLocaleString()}`);

  const rest = new REST({ version: '10' }).setToken(token);

  rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error);

  var listedChannel = client.guilds.cache
    .find((guild) => guild.id == guildID)
    .channels.cache.find((channel) => channel.id == channelID);

  const embed = new EmbedBuilder()
    .setTitle("WE'RE ALL GONNA MAKE IT. GET YOUR CALORIES IN")
    .setDescription("Input calories using the slash command `/input_food`")
    .setColor("#0099ff")
    .setImage(
      "https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png"
    );
  listedChannel.send({ embeds: [embed] });

  listedChannel.send(
    `The current calorie goal is \`${globals.calorieGoal} cal\`. Would you like to change it?\nUse the slash command \`/change_calorie_goal\` to modify the calorie goal to your desire.`
  );

  var tempDate = new Date().toLocaleString().split(",");
  db.insertTCalTable({
    date: tempDate[0],
    totalCal: globals.calorieGoal
  });

  //------------------------REMINDER/PROMPT FUNCTIONS-------------------------------------

  setInterval(() => {
    var dt = new Date();
    if (dt.getHours() == 0 && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
      //when the time turns 12:00 A.M.
      var listedChannel = client.guilds.cache
        .find((guild) => guild.id == guildID)
        .channels.cache.find((channel) => channel.id == channelID);

      const embed = new EmbedBuilder()
        .setTitle("WE'RE ALL GONNA MAKE IT. GET YOUR CALORIES IN")
        .setColor("#0099ff")
        .setImage(
          "https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png"
        );
      listedChannel.send({ embeds: [embed] });
      globals.totalCalories = 0;
    }

    client.channels.fetch(channelID).then((channel) => {

      if (dt.getHours() == globals.morningHour && dt.getMinutes() == globals.morningMinutes && dt.getSeconds() == 0) {
        channel.send(`<@${globals.userID}> Good Morning! What did you eat for breakfast today? (Use \`/input_food\` to input food and calories)`);
        channel.send(`You are \`${globals.totalCalories}\`/\`${globals.calorieGoal}\` calories of the way there!`);
      }

      if (dt.getHours() == globals.afternoonHour && dt.getMinutes() == globals.afternoonMinutes && dt.getSeconds() == 0) {
        channel.send(`<@${globals.userID}> Good Afternoon! What did you eat for lunch today? (Use \`/input_food\` to input food and calories)`);
        channel.send(`You are \`${globals.totalCalories}\`/\`${globals.calorieGoal}\` calories of the way there!`);
      }

      if (dt.getHours() == globals.nightHour && dt.getMinutes() == globals.nightMinutes && dt.getSeconds() == 0) {
        channel.send(`<@${globals.userID}> Good Evening! What did you eat for dinner today? (Use \`/input_food\` to input food and calories)`);
        channel.send(`You are \`${globals.totalCalories}\`/\`${globals.calorieGoal}\` calories of the way there!`);
      }

      if (
        dt.getHours() == 23 && dt.getMinutes() == 59 && dt.getSeconds() == 59) {
        var flag;
        if (globals.totalCalories < globals.calorieGoal) {
          channel.send(`<@${globals.userID}> You have failed to reach your calorie goal for the day. Try again tomorrow!`);
          flag = 0;
        } else {
          channel.send(`<@${globals.userID}> Congrats! You successfully reached your calorie goal for the day!`);
          flag = 1;
        }
        globals.foodList = [];
        var tempDate = new Date().toLocaleString().split(",");
        globals.totalCalories = 0;
      }
    });
  }, 1000); // interval (1 second)
});

//------------------------COMMAND FUNCTIONS-------------------------------------

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log("Command name:", interaction.commandName);

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  }
  catch (err) {
    if (err) console.log(err)
  }
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().replaceAll(" ", "").split("-");
  const argsWS = message.content.slice(prefix.length).trim().split("-");

  console.log(args);
});