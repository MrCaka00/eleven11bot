const Discord = require('discord.js');
const ms = require('parse-ms');

exports.run = async(client, message, args) => {
  let yilbasi = new Date('2021-06-26 00:00:00')
    let time = ms(yilbasi - Date.now())

    message.channel.send(`YKS ye **${time.days}** gün **${time.hours}** saat **${time.minutes}** dakika **${time.seconds}** saniye kaldı ve götelek efrahim buralarda geziyor`)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yks'],
  permLevel: 0
};

exports.help = {
  name: 'yks',

  description: 'yks',
  usage: ''
};