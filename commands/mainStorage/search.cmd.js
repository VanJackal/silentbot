const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Search for an item in main storage"),
    async execute(interaction) {
        await interaction.reply("use /search <itemName> to search for an item")
    }
}
