const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
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
            const embed = new EmbedBuilder()
                .setColor('#1952ff')
                .setTitle(`Search Results!`)
                .setDescription(`Results for: ${item}`)

            const fields = []


            results.forEach((result) => {
                fields.push({
                    name:result.item,
                    value: result.msg
                })
            })
            if(fields.length >=25){
                embed.addFields(...fields.slice(0,24), {
                    name:"Not what you're looking for?",
                    value:"search returned more than 24 results you may need to narrow your search ;)"
                })
            } else {
                embed.addFields(...fields)
            }


            await interaction.reply({embeds:[embed]})
        }


    }
}
