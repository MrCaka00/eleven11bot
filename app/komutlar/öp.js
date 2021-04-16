const Discord = require('discord.js')

var gif = ['https://c.tenor.com/398_38yfTXcAAAAM/eva-green-casino-royale.gif'] /// içine ekleyebilirsiniz istediğiniz kadar
 exports.run = function(client, message, args) {

let gifler = gif[Math.floor(Math.random() * gif.length)]
message.channel.send(
  new Discord.RichEmbed()
 .setColor(message.guild.me.displayColor)
   .setTitle('Gral hızlı davrandı')
     .setImage(gifler)

  .setFooter('Dudişinden öp')
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

  name: 'öp',
  description: 'dudişinden öp',
  usage: 'öp'

}