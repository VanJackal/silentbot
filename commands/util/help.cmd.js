const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Sends a helpful message"),
    async execute(interaction) {
        await interaction.reply("use /search <itemName> to search for an item")
    }
}