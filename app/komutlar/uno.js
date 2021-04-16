//fiber botlist'den MustafaBey tarafından yapılmıştır
const Discord = require('discord.js')

var gif = ['https://www.cubemcpe.net/1.PNG','https://www.cubemcpe.net/2.PNG','https://www.cubemcpe.net/3.PNG','https://www.cubemcpe.net/4.PNG','https://www.cubemcpe.net/5.PNG','https://www.cubemcpe.net/6.PNG','https://www.cubemcpe.net/7.PNG','https://www.cubemcpe.net/8.PNG','https://www.cubemcpe.net/9.PNG','https://www.cubemcpe.net/engel.PNG','https://www.cubemcpe.net/artıdört.PNG','https://www.cubemcpe.net/artıiki.PNG','https://www.cubemcpe.net/0.PNG'] /// içine ekleyebilirsiniz istediğiniz kadar
 exports.run = function(client, message, args) {

let gifler = gif[Math.floor(Math.random() * gif.length)]
message.channel.send(
  new Discord.RichEmbed()
 .setColor(message.guild.me.displayColor)
   .setTitle('Efrahim Uno Sistemi')
     .setImage(gifler)

  .setFooter('Efrahim Uno Sistemi')
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

  name: 'uno',
  description: 'Uno Kartları ',
  usage: 'uno'

}
//fiber botlist'den nmn tarafından yardım edildi