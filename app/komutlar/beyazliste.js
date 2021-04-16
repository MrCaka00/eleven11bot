const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
const Discord = require('discord.js')
exports.run = async(client, message, args) => {
 if(message.author.id !== ayarlar.sahip)return message.channel.send('Bu komutu Kullanamazsın')
 
 let kullanıcı = message.mentions.members.first() || client.users.get(args[0])
  if(!kullanıcı) return message.channel.send(`Karalisteye kimi alıcaksın?`)///f(!sebep) return message.channel.send(`Sebep belirtmelisin.`)
  let kullanıcı2 = client.users.get(kullanıcı.id)
  if(!db.has(`sebep_${kullanıcı.id}`)) return message.channel.send(`Bu kişi karalistede bulunmuyor.`)
  db.delete(`sebep_${kullanıcı.id}`)
  message.channel.send(new Discord.RichEmbed()
                      .setTitle(`Başarılı ✅`)
                      .setDescription(`${kullanıcı} adlı kişi karalisteden çıkarıldı.`)
                      .setColor(message.guild.me.displayColor))
  kullanıcı2.send(new Discord.RichEmbed()

                      .setTitle(`❗DİKKAT❗`)
                      .setDescription(`**${message.guild.name}** sunucusunda karalisteden çıkarıldın.`)
                      .setColor('#FF0000'))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['beyaz-liste'],
  permLevel: 0
};

exports.help = {
  name: 'beyazliste',
  description: 'JavaScript kanallarına erişim sağlar.',
  usage: 'js'
};