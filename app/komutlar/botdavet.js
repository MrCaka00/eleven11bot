const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const davet = new Discord.RichEmbed()
    .setColor(message.guild.me.displayColor)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('• Botun davet bağlantısı: [Tıkla](https://discord.com/api/oauth2/authorize?client_id=791036596816052244&permissions=8&scope=bot) 💌');
    message.channel.send(davet) }
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botu ekle', 'botu davet et', 'botuekle', 'invite'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Botun davet bağlantısını gönderir.',
  usage: 'davet'
};