const Discord = require("discord.js")
const {GatewayIntentBits} = require ("discord.js")
require("dotenv").config()

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
})

client.on("ready", () => {
    console.log('FixEmbeds is online!')
})

let botID = process.env.CLIENTID
client.on("messageCreate", (message) =>{

//Try catch statement is to auto-rstart bot if any errors occur
try {
  if (message.content.includes("https://www.x.com") || message.content.includes("https://x.com"))
    {

      if ((message.content.includes("vxtwitter.com") || message.content.includes("fxtwitter.com") || message.content.includes("fixupx.com")) || (message.author.id == botID))
      {
        return;
      }

      else
      {
        newmsg = message.content.replaceAll("x.com", "fixupx.com")
        message.reply("**Fixed message with embed:\n**" + newmsg + "\n" + "***To do twitter embeds replace x.com and twitter.com in your message with fixupx.com or fxtwitter.com respectively***");
      }
    }

    if (message.content.includes("https://www.twitter.com") || message.content.includes("https://twitter.com"))
    {
      if((message.content.includes("fxtwitter.com") || message.content.includes("vxtwitter.com") || message.content.includes("fixupx.com")) || (message.author.id == botID))
      {
        return;
      }

      else
      {
        newmsg = message.content.replaceAll("twitter.com", "fxtwitter.com")
        message.reply("**Fixed message with embed:\n**" + newmsg + "\n" + "***To do twitter embeds replace x.com and twitter.com in your message with fixupx.com or fxtwitter.com respectively***");
      }
    }

    if (message.content.includes("https://www.tiktok.com") || message.content.includes("https://tiktok.com"))
    {

      if (message.content.includes("tfxktok.com") || (message.author.id == botID))
      {
        return;
      }

      else
      {
        newmsg = message.content.replaceAll("tiktok.com", "tfxktok.com")
        message.reply("**Fixed message with embed:\n**" + newmsg + "\n" + "***To do tiktok embeds tiktok.com in your message with tfxktok.com \nYou can type s/e/fx on desktop to edit your previous sent message to include the embed***");
      }
    }
    throw (error)
  } 

  catch (error) 
  {
    console.log("Fatal error detected1 Restarting bot!")
    client.login(process.env.TOKEN)
  }
})

//Bot token for login
client.login(process.env.TOKEN)