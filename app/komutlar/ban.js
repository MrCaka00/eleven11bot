const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Komutu  kullanmak için iznin yok :x:`)

  let kişi = message.mentions.users.first();
  if (!kişi) return message.channel.send("Banlamam için birini etiketle :no_entry_ ")

 const kuaty = new Discord.RichEmbed()
 .setTitle("Başarılı")
 .setDescription(`${kişi} adlı kişi başarıyla 
 banlandı.`)
 message.channel.send(kuaty)
 message.guild.ban(kişi, 2);


};

module.exports.conf = {
  aliases: [],
  permLevel: 2,
  enabled: true,
  guildOnly: false,
};

module.exports.help = {
  name: "ban",
  description: "Birini banlarsın",
  usage: "ban"
};