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

    //Sets all chars to lowercase to easily check if message has a link
    let lowerMsg = message.content.toLowerCase()

    if(lowerMsg.includes("https://" ) && lowerMsg.includes(".com"))
    {

      //Calls function to collect alll twitter, x, and tiktok links
      let returnedLinks = (fixLinks(msg))

      //If no matching links are found, do nothing
      if ((returnedLinks == 0) || (returnedLinks == undefined) || (returnedLinks == null) || (returnedLinks == "") || (returnedLinks == " "))
      {
        return
      }

      else
      {
      //Modifies all relevant links to include embeds and reply to original message
      let fixedmsg = returnedLinks.toString()
      fixedmsg = fixedmsg.replace(/twitter.com/gi, "fxtwitter.com")
      fixedmsg = fixedmsg.replace(/x.com/gi, "fixupx.com")
      fixedmsg = fixedmsg.replace(/tiktok.com/gi, "tfxktok.com")
      message.reply("**Fixed embeds in message:\n**" + fixedmsg + "\n" + "***To do twitter embeds replace x.com and twitter.com in your message with fixupx.com or fxtwitter.com respectively\nTo do tiktok embeds replace tiktok.com in your message with tfxktok.com \nHint: You can type s/e/fx on desktop to edit your previous sent message to include the TikTok embed***");}
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

//Function to isolate each links and modify them to include embeds.
function fixLinks(newmsg)
{
  //Another lowercase instance of the message. This is for comparision within the function.
  let lowerMsg2 = newmsg.toLowerCase()
  
  //Array decleration. All links with fixable embeds are pushed here
  const linksToFix = []

  //For loop going through string to see if a link is detected
  for (j = 0; j < newmsg.length + 1; j++)
  {
    //Gets the base link from https:// and the .com indices
    //+3 is added to .com as location is taken from start of substring
    linkStart = lowerMsg2.indexOf("https://")
    dotComLocation = lowerMsg2.indexOf(".com")
    dotComLocation += 4
            
    //Finds full link after the .com
    for (i = dotComLocation; i < newmsg.length + 1; i++)
      {
        if ((newmsg.charAt(i) == null) || (newmsg.charAt(i) == undefined) || (newmsg.charAt(i) == "") || (newmsg.charAt(i) == " "))
        {
          linkEnd = i
          break
        }
      }
      
    //Checks if the link is a Twitter, X, or Tiktok link
    testLink = newmsg.slice(linkStart, linkEnd + 1)
    testLinkLower = testLink.toLowerCase()
    if(testLinkLower.includes("twitter.com") || testLinkLower.includes("x.com") || testLinkLower.includes("tiktok.com"))
    {

      //vxtwitter.com is also a Twitter embed fix, if it's caught because of the character overlap with twitter.com, it is skipped
      if(testLinkLower.includes("vxtwitter.com"))
      {
        j += testLink.length
        return
      }

      if(testLinkLower.includes("fixupx.com"))
      {
        j += testLink.length
        return
      }

      else
      {    
        //Pushes link to array, removes link from newmsg and resets loop count to search for next instance of a link
        linksToFix.push(testLink);
        newmsg = newmsg.replace(testLink, "")
        newmsg = newmsg.trim()
        j = 0
      }
    }

    else
    {
      j += testLink.length
    }
  }    

  //Links are sent back to main body where they will be edited and posted
  return linksToFix
}

//Bot token for login
client.login(process.env.TOKEN)