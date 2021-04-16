const Discord = require('discord.js')

var gif = ['https://cubemcpe.net/amongus.gif'] /// içine ekleyebilirsiniz istediğiniz kadar
 exports.run = function(client, message, args) {

let gifler = gif[Math.floor(Math.random() * gif.length)]
message.channel.send(
  new Discord.RichEmbed()
 .setColor(message.guild.me.displayColor)
   .setTitle('Aile var lan höst')
     .setImage(gifler)

  .setFooter('götünden sik')
   .setTimestamp()

  )

}
////Fiber Botlist &amp; Code
exports.conf = {

  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0

};

exports.help = {

  name: 'sik',
  description: 'götünden sik',
  usage: 'sik'

}