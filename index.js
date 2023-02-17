const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember] });
const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const Discord = require("discord.js");
const db = require("croxydb")
const { PermissionsBitField } = require("discord.js");
const { InteractionType } = require("discord.js");
const { isMainThread } = require("worker_threads");
let token = config.token

client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

//command-handler
const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
  console.log(`[COMMAND] ${command.data.name} komutu yüklendi.`)
})

client.on("ready", async () => {
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
  } catch (error) {
    console.error(error);
  }
  log(`${client.user.username} Aktif Edildi!`);
})

//event-handler
readdirSync('./src/events').forEach(async file => {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
    console.log(`[EVENT] ${event.name} eventi yüklendi.`)
  }
})

//nodejs-events
process.on("unhandledRejection", error => {
  console.log(error)
})
process.on("uncaughtException", error => {
  console.log(error)
})
process.on("uncaughtExceptionMonitor", error => {
  console.log(error)
})
//

client.login(token)




//disco rol
client.on('interactionCreate', async interaction => {
if(interaction.commandName.toLowerCase() === 'disco' ) {
  const discorol = db.fetch(`discorol_${interaction.guild.id}`)
  if(!discorol) return interaction.reply('Disco rolünü ayarlamamışsın! /discorol-ayarla'); 
  if(interaction.channel.type === 'dm') return;
const discorolbasladı = new EmbedBuilder()
.setDescription("✅ Renk Değişimi Başlıyor!")
setInterval(() => {
 interaction.guild.roles.cache.find(s =>s.name === discorol) .setColor("Random")
},750)
interaction.reply({embeds: [discorolbasladı]})

}

}
)

//disco rol
client.on('interactionCreate', async interaction => {
  if(interaction.commandName.toLowerCase() === 'disco-durdur' ) {
    const discorol = db.fetch(`discorol_${interaction.guild.id}`)
    if(interaction.channel.type === 'dm') return;
  const discofinish = new EmbedBuilder()
  .setDescription("✅ Disco durduruldu!")
  setInterval(() => {
   interaction.guild.roles.cache.find(s =>s.name === discorol) .setColor("Aqua")
  })
  // db.delete(`discorol_${interaction.guild.id}`)
  interaction.reply({embeds: [discofinish]})
  
  }
  
  }
  )