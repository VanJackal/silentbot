const fs = require("node:fs")
const path = require('node:path')
const {Client, Collection, Events, GatewayIntentBits} = require("discord.js")

const TOKEN = process.env.TOKEN

const client = new Client({ intents:[GatewayIntentBits.Guilds]})
client.commands = new Collection();

//* COMMANDS INIT
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs.readdirSync(commandsPath).filter(file=> file.endsWith(".cmd.js"))
    for( const file of commandFiles){
        const filePath = path.join(commandsPath,file)
        const command = require(filePath)
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.warn(`[WARN] command at ${filePath} is missing a require attribute`)
        }
    }
}

// COMMAND HANDLER
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.warn("invalid command")
        return
    }

    try {
        await command.execute(interaction)
    } catch (e) {
        console.error(e)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content:"There was an error in command execution!",ephemeral:true})
        } else {
            await interaction.reply({content:"There was an error in command execution!",ephemeral:true})
        }
    }
})

client.once(Events.ClientReady,(readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(TOKEN)