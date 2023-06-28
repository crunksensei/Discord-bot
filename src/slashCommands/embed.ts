import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder, ColorResolvable, ApplicationCommandChoicesData, Options } from "discord.js"
import { SlashCommand } from "../types";
import { url } from "inspector";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Create a new embed message.")
    .addStringOption(option => {
      return option
        .setName("title")
        .setDescription("Title of the embed message")
        .setRequired(true);
    })
    .addStringOption(option => {
      return option
        .setName("description")
        .setDescription("Description of the embed message.")
        .setRequired(true);
    })
    .addChannelOption(option => {
      return option
        .setName("channel")
        .setDescription("Text channel where the embed message will be sent.")
        .setRequired(true);
    })
    .addStringOption(option => {
      return option
        .setName("image")
        .setDescription("Image URL.")
        .setRequired(false);
    }),
  execute: async (interaction) => {
    const imageURLs = interaction.options.get("image")?.value;
    try {
      await interaction.deferReply({ ephemeral: true });
      const options: { [key: string]: string | number | boolean } = {};
      if (!interaction.options) return interaction.editReply({ content: "Something went wrong..." });
      for (let i = 0; i < interaction.options.data.length; i++) {
        const element = interaction.options.data[i];
        if (element.name && element.value) options[element.name] = element.value;
      }
      const embed = new EmbedBuilder()
        .setTitle(options.title.toString())
        .setImage(options.image.toString())
        .setDescription(options.description.toString())
        .setAuthor({name: `${interaction.user.username}` || 'Unknown'})
        .setThumbnail(interaction.client.user?.avatarURL() || null)
        .setColor('#0047AB')
        .setTimestamp();
      let selectedTextChannel = interaction.channel?.client.channels.cache.get(options.channel.toString()) as TextChannel
      selectedTextChannel.send({ embeds: [embed] });
      return interaction.editReply({ content: "Embed message successfully sent." })
    } catch (error) {
      interaction.editReply({ content: "Something went wrong..." });
    }

  },
  cooldown: 10
}

export default command