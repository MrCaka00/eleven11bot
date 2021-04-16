const Discord = require('discord.js');

module.exports.run = (client, message, args) => {


 let kullanıcı = message.mentions.users.first() || message.author;
 
    const pp = new Discord.RichEmbed()
        .setColor(message.guild.me.displayColor)
        .setTitle("Avatara Bak Fenaymış .d")
        .setImage(kullanıcı.avatarURL)
    message.channel.send(pp)

};

module.exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['pp'],
  permLevel: 0
};

module.exports.help = {
name: 'avatar',
};