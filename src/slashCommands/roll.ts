import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls a dice")
    .addNumberOption(option =>
        option.setName("dice")
        .setDescription("number of sides on the dice")
        .setRequired(true))
    ,
    execute: interaction => {
        const rolls = interaction.options.get("dice")?.value
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: `${interaction.user.username}`})
                .setDescription(`Your rolls is: ${Math.floor(Math.random() * Number(rolls)) + 1}`)
                .setColor(getThemeColor("text"))
            ]
        })
    },
    cooldown: 2
}

export default command