const Discord = require('discord.js')

var gif = ['https://media1.tenor.com/images/4f21b6258ba678f35479342adc6a41a6/tenor.gif?itemid=10288438'] /// içine ekleyebilirsiniz istediğiniz kadar
 exports.run = function(client, message, args) {

let gifler = gif[Math.floor(Math.random() * gif.length)]
message.channel.send(
  new Discord.RichEmbed()
 .setColor(message.guild.me.displayColor)
   .setTitle('Gel lan buraya sarılcam')
     .setImage(gifler)

  .setFooter('Korona')
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

  name: 'sarıl',
  description: 'sarıl',
  usage: 'sarıl'

}