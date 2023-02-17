const { PermissionsBitField } = require("discord.js");
const { Client, EmbedBuilder } = require("discord.js");

const db = require("croxydb")
const { SlashCommandBuilder, ModalBuilder,  TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const { performance } = require('perf_hooks');
const util = require("util");

        module.exports = {
            data: new SlashCommandBuilder()
              .setName("discorol-ayarla")
              .setDescription("'Disco Rolü Ayarlama!")
              .addRoleOption(input => 
                input.setName('rol')
                .setDescription('Lütfen bir rol etiketle!')
                .setRequired(true)),
                run: async (client, interaction, args) => {
    const rol = interaction.options.getRole('rol')
    const ayarlandı = new EmbedBuilder()
    .setColor("#f8ac1d")
   .setDescription("✅ Disco Rolü Başarıyla <@&"+rol+"> Olarak Ayarlandı.")
   .setFooter({ text: "Krom" })


   if(!interaction.guild.members.cache.get(client.user.id).permissions.has("Administrator")) return interaction.reply("Yönetici yetkim olmadığı için banlayamıyorum.")    

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "**Rolleri Yönet** Yetkin Yok!"})

    db.set(`discorol_${interaction.guild.id}`, rol.name)
    interaction.reply({embeds: [ayarlandı], allowedMentions: { repliedUser: false }})
}

};
