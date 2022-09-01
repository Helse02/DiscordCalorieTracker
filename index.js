const { timeStamp } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const { Client, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

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
const guildId = config.guildId;
const channelId = config.channel;
client.login(token);
var calorieGoal = 2500;
var totalCalories = 0;

// const guildData = {};

// function createGuild(guildId, channelId) {
//   return {
//     guildId, channelId,
//     calories: 2500
//   };
// }

// function getGuild(guildId)

client.once("ready", () => { // when the bot turns on, run the function
  // Alternatively, you can set the activity to any of the following:
  // PLAYING, STREAMING, LISTENING, WATCHING
  
  client.user.setPresence({
    activities: [{ name: `Thinh's Calories`, type: Discord.ActivityFlags.WATCHING }]
  });

  console.log('Ready');
  var currentDate = new Date();
  var fullDate = addZero(currentDate.getMonth() + 1) + "-" + addZero(currentDate.getDate()) + "-" + addZero(currentDate.getFullYear());
  var actualMath = client.guilds.cache.find((guild) => guild.id == guildId).channels.cache.find((channel) => channel.id == channelId);

      const embed = new EmbedBuilder()
        .setTitle("WE'RE ALL GONNA MAKE IT. GET YOUR CALORIES IN\n input calories using this format '-500'")
        .setColor("#0099ff")
        .setImage("https://cdn.discordapp.com/attachments/1014283703876333568/1014335242175254528/unknown.png");
      actualMath.send({embeds: [embed]});

  setInterval(() => {
    var dt = new Date();
    if (dt.getHours() == 0 && dt.getMinutes() == 0 && dt.getSeconds() == 0) { //when the time turns 12:00 A.M.
      var actualMath = client.guilds.cache.find((guild) => guild.id == "738980331562205246").channels.cache.find((channel) => channel.id == "1014283703876333568");

      const embed = new EmbedBuilder()
        .setTitle("WE'RE ALL GONNA MAKE IT. GET YOUR CALORIES IN")
        .setColor("#0099ff")
        .setImage("https://cdn.discordapp.com/attachments/1014283703876333568/1014335242175254528/unknown.png");
      actualMath.send({embeds: [embed]});
    }

    client.channels.fetch(channelId)
    .then(channel => {

      if (dt.getHours() == 11 && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        channel.send("Good Morning Daddy Thinh! Whatd you eat for breakfast today? (Please input data in the format '-500' to input 500 calories");
        channel.send(`You are ${totalCalories}/${calorieGoal} calories of the way there!`);
      }

      if (dt.getHours() == 15 && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        channel.send("Good Afternoon Daddy Thinh! Whatd you eat for lunch today? (Please input data in the format '-500' to input 500 calories");
        channel.send(`You are ${totalCalories}/${calorieGoal} calories of the way there!`);
      }

      if (dt.getHours() == 20 && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        channel.send("Good Evening Daddy Thinh! Whatd you eat for dinner today? (Please input data in the format '-500' to input 500 calories");
        channel.send(`You are ${totalCalories}/${calorieGoal} calories of the way there!`);
      }

      if (dt.getHours() == 0 && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        if (totalCalories < calorieGoal) {
            channel.send("You have failed to reach your calorie goal for the day scrawny ass. No pussy for you tonight");
        }
        else {
            channel.send("Congrats! You successfully reached your calorie goal for the day!");
        }
        totalCalories = 0;
      }
    })   
  }, 1000); // interval (1 second)
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'count') {
		await interaction.reply(`Total Calorie Count: ${totalCalories}/${calorieGoal} calories`);
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (!isNaN(command)) {
    totalCalories = totalCalories + parseInt(command);
    message.channel.send(`Great Job! Keep getting your calories in! ${command} calories has been inputed`);
  } else if (isNaN(command)) {
     message.channel.send("Please type in a valid response");
  }
});

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

  // "eggs and bacon" 500 