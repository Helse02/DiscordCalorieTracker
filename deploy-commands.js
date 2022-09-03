const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('count').setDescription('Replies with calorie count'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('list').setDescription('Replies with list of food eaten!'),
	new SlashCommandBuilder().setName('help').setDescription('Help'),
	//new SlashCommandBuilder().setName('changeTime').setDescription('Changes certain eating time'),
]
	.map(command => command.toJSON());
  
const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands})
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);