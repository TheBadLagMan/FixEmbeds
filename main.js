const Discord = require("discord.js")
const {GatewayIntentBits} = require ("discord.js")
const { indexOf, extendWith, forEach } = require("lodash")
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

//Try catch statement is to auto-restart bot if any errors occur
try { 
  
  //Ignores messages sent by bot
  if (message.author == botID)
  {
    return
  }

  else
  {
    let msg = message.content
    //Uses Regex to ensure https:// and http:// are lowercase for proper embeds
    msg = msg.replaceAll(/https/gi, "https") 
    msg = msg.replaceAll(/http/gi, "http") 

    if(msg.includes("https://twitter.com" ) || msg.includes("https://x.com") || msg.includes("https://tiktok.com") || msg.includes("https://www.x.com") || msg.includes("https://www.twitter.com") || msg.includes("https://www.tiktok.com") || msg.includes("http://twitter.com" ) || msg.includes("http://x.com") || msg.includes("http://tiktok.com") || msg.includes("http://www.x.com") || msg.includes("http://www.twitter.com") || msg.includes("http://www.tiktok.com"))
    {

      ////console.log("The message with replaced links is: " + msg)
      
      //Now the links are going to be isolated from the message so only the embedded links are in the reply
      var msg2 = msg
      var startLink
      var endLink
      var newmsg = ""
      ////console.log("msg2 is: " + msg2)
      ////console.log("msg2 length is: " + msg2.length)

      for (i = 0; i < msg2.length; i++)
      {

          startLink = msg2.indexOf("http", i)

          if (startLink == -1)
          {
            //console.log("No link characters detected!")
            break
          }
          //console.log("This is the start of the link: " + startLink)
  
          endLink = msg2.indexOf(" ", (i + 1))
          //console.log("This is the end of the link: " + endLink)
          
          linkToPush = msg2.slice(startLink, endLink)
          //console.log("The detected link is: " + linkToPush)
          i += linkToPush.length
  
          //console.log("Current count is: " + i)
  
          if(linkToPush.includes("https://twitter.com" ) || linkToPush.includes("https://x.com") || linkToPush.includes("https://tiktok.com") || linkToPush.includes("https://www.x.com") || linkToPush.includes("https://www.twitter.com") || linkToPush.includes("https://www.tiktok.com") || linkToPush.includes("http://twitter.com" ) || linkToPush.includes("http://x.com") || linkToPush.includes("http://tiktok.com") || linkToPush.includes("http://www.x.com") || linkToPush.includes("http://www.twitter.com") || linkToPush.includes("http://www.tiktok.com"))
          {
            //console.log("Pushing link to newmsg!")
            newmsg += " " + linkToPush
            //console.log("Current newmsg is: " + newmsg)
          }
        }
        newmsg = newmsg.trim()
      //console.log("The final newmsg is: " + newmsg)
      
      //Edits all twitter, x, and tiktok links with their respective embeds
      //See: https://regex101.com/
      //Note that embeds that are already fixed are not included in the reply
      newmsg = newmsg.replaceAll(/x.com/gi, "fixupx.com")              
      newmsg = newmsg.replaceAll(/twitter.com/gi, "fxtwitter.com")              
      newmsg = newmsg.replaceAll(/tiktok.com/gi, "tfxktok.com") 
      message.reply(":arrow_down: **Fixed embeds below** :arrow_down: \n**Hint:** *Type fxtwitter.com or fixupx.com to embed Twitter links. Type tfxktok.com to embed Tiktoks.*\n" + newmsg)
    }
    else 
    {
      return
    }
  }
} 

//If an error is caught, the bot is restarted
catch (error) 
{
  console.log("Fatal error detected, Restarting bot!")
  console.log(error)
  client.login(process.env.TOKEN)
}
})

//Bot token for login
client.login(process.env.TOKEN)
