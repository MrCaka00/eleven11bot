const Discord = require('discord.js')
exports.run = async (client, msg, args) => {
    
      let member = msg.mentions.members.first()
let yuzde = Math.round(Math.random() * 100)
     if(!member)return msg.reply("Aşkını ölçmek istediğin kişiyi etiketle.")
const embed = new Discord.RichEmbed()
.setTitle(`Aşk Ölçer`)
.setColor("RANDOM")
.setDescription(`${member} kişisine %${yuzde} aşıksın <3 `)
msg.channel.send(embed)
 
 
 
   
 
  }
 
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
   };
 
  exports.help = {
    name: 'aşkölçer',
    description: 'Aşk Ölçmeni sağlar.',
    usage: 'aşkölçer'
   }