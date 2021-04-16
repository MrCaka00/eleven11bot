///////-- MESSAGE.JS

const ayarlar = require('../ayarlar.json');

const db = require('quick.db')

const Discord = require('discord.js')

module.exports = async message => {

let karaliste = db.fetch(`sebep_${message.author.id}`) 

let prefix = ayarlar.prefix

  let client = message.client;

  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0].slice(prefix.length);

  let params = message.content.split(' ').slice(1);

  let perms = client.elevation(message);

  let cmd;

  if (client.commands.has(command)) {

    cmd = client.commands.get(command);

  } else if (client.aliases.has(command)) {

    cmd = client.commands.get(client.aliases.get(command));

  }

  if (cmd) {

    if(karaliste)return message.channel.send(new Discord.RichEmbed()

                                            .setColor('#FF0000')

                                             .setTitle('Karalisteye Alınmışsınız!')

                                            .setDescription('Botun sahibi seni **' + karaliste + '** sebebiyle karalisteye almış.'))

    if (perms < cmd.conf.permLevel) return;

    cmd.run(client, message, params, perms);

  }

};