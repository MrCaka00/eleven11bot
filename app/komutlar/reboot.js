const Discord = require('discord.js');


exports.run = (client, message, args) => {
    message.channel.sendMessage(`Bot yeniden başlatılıyor... 🔧`).then(msg => {
    console.log(`BOT: Bot yeniden başlatılıyor... `);
    process.exit(0);
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};
////////FİBER CODE & BOTLİST
exports.help = {
  name: 'reboot',
  description: 'Botu yeniden başlatır.',
  usage: 'reboot'
};