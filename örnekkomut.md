const db = require("croxydb")
const { PermissionsBitField } = require("discord.js");
const { Client, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("karaliste-ekle")
      .setDescription("Sunucuyu Karalisteye Eklersin (SAHİP ÖZEL)")
      .addUserOption(input => 
        input.setName('sunucuid')
        .setDescription('Sunucu idsi gir.')
        .setRequired(true))
        .addUserOption(input => 
          input.setName('deneme')
          .setDescription('Sunucu idsi gir.')
          .setRequired(true)),
run: async(client, interaction,args,data) => {
    if (interaction.user.id !== '820323335832862782') return interaction.reply('Sen benim sahibim olan Krom değilsin!')
    const sunucuid = interaction.options.getString('sunucuid')
    db.set (`karaliste_${sunucuid}`, true)
 const ayarlandı = new EmbedBuilder()
 .setColor("#f8ac1d")
.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
.setDescription("**✅ Sunucu Karalisteye Alındı!**")
.addFields({ name: 'Karalisteye Alınan Sunucu İDsi:', value: `${sunucuid}`, inline: true })
   .setFooter({ text: "Cowboy" })

 interaction.reply({embeds: [ayarlandı], allowedMentions: { repliedUser: false }})

}
};