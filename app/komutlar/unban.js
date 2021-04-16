const Discord = require('discord.js');

const client = new Discord.Client();

exports.run = (client, message, args) => {

  if (!message.guild) {

  return message.author.send("Bu komutu özel mesajlarda kullanamazsın"); }

  let guild = message.guild

  let user = args[0];

  if (!user) return message.reply('Banı kaldırılacak kişinin ID numarasını yazmalısın.').catch(console.error);

  message.guild.unban(user).then(message.channel.send("Kullanıcının yasağı başarıyla kaldırıldı."))

 

};

exports.conf = {

  enabled: true,

  guildOnly: true,

  aliases: ['ban-kaldır'],

  permLevel: 2

};

/////FİBER BOTLİST & CODE

exports.help = {

  name: 'unban',

  description: 'İstediğiniz kişinin banını kaldırır.',

  usage: 'unban <kullanıcı>'

};