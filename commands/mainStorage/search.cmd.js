const {SlashCommandBuilder} = require("discord.js")
const ms = require("mainStorage/mainStorage")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Search for an item in main storage")
        .addStringOption(option =>
            option
                .setName("item")
                .setDescription("Name of the item you are searching for")
                .setRequired(true)
        ),
    async execute(interaction) {//TODO Embeds
        const item = interaction.options.getString("item")
        const results = await ms.getItem(item)
        if(results.length === 0) {
            await interaction.reply(`No results for ${item}`)
        } else {
            let out = ".\n"
            results.forEach((result) => {
                out += result.msg
                out += "\n"
            })
            await interaction.reply(out)
        }


    }
}
