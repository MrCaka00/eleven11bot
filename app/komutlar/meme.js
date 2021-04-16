//fiber botlist'den MustafaBey tarafından yapılmıştır
const Discord = require('discord.js')

var gif = ['https://i.ibb.co/sRFhGMN/images-5.jpg','https://i.ibb.co/9r28DKy/images-9.jpg','https://i.ibb.co/xsHQwxJ/images-3.jpg','https://i.ibb.co/xsHQwxJ/images-3.jpg','https://i.ibb.co/72vY0hv/images-2.jpg','https://i.ibb.co/m8TXxn5/images-1.jpg'] /// içine ekleyebilirsiniz istediğiniz kadar
 exports.run = function(client, message, args) {

let gifler = gif[Math.floor(Math.random() * gif.length)]
message.channel.send(
  new Discord.RichEmbed()
 .setColor(message.guild.me.displayColor)
   .setTitle('Random Meme System')
     .setImage(gifler)

  .setFooter('r/burdurland ')
   .setTimestamp()

  )

}
////Fiber Botlist & Code
exports.conf = {

  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 0

};

exports.help = {

  name: 'meme',
  description: 'Random Meme Atar',
  usage: 'meme'

}
//fiber botlist'den nmn tarafından yardım edildi