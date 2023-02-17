const { PermissionsBitField } = require("discord.js");
const { Client, EmbedBuilder } = require("discord.js");

const db = require("croxydb")
const { SlashCommandBuilder, ModalBuilder,  TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const { performance } = require('perf_hooks');
const util = require("util");

        module.exports = {
            data: new SlashCommandBuilder()
              .setName("disco-durdur")
              .setDescription("'Disco Durdurma!"),
                run: async (client, interaction, args) => {

}

};
