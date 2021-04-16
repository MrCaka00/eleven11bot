//fiber botlist'den MustafaBey tarafından yapılmıştır
const Discord = require("discord.js");

var gif = [
  "https://i.hizliresim.com/RVEn0Y.gif"
]; /// içine ekleyebilirsiniz istediğiniz kadar
exports.run = function(client, message, args) {
  let gifler = gif[Math.floor(Math.random() * gif.length)];
  message.channel.send(
    new Discord.RichEmbed()
      .setColor(message.guild.me.displayColor)
      .setTitle("Totona bir şaplakkkk.Bi dahakine göte muhayet ol")
      .setImage(gifler)

      .setFooter("Şaplak At")
      .setTimestamp()
  );
};
////Fiber Botlist &amp; Code
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "şaplak",
  description: "şaaaaaaaaak",
  usage: "şaplak"
};
//fiber botlist'den MustafaBey tarafından yapılmıştır
