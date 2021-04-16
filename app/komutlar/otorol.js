
const Discord = require('discord.js')

const client = new Discord.Client()

const db = require('quick.db')

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Hop hemşerim nereye yetkin yok kullanamazsın.')
    if(!args[0]) return message.channel.send("Doğru kullanım ``!otorol ayarla @rol #kanal`` veya `!otorol sıfırla`")
    if(args[0] === "ayarla"){
      var rol = message.mentions.roles.first()
      var kanal = message.mentions.channels.first()
      if(!rol) return message.channel.send("Bİr rol etiketlemelisin!!!")
      if(!kanal) return message.channel.send("Bir kanal etiketlemelisin!!")
      db.set(`otorol_${message.guild.id}`, rol.id)
      db.set(`logkanal_${message.guild.id}`, kanal.id)
      message.channel.send("Başarıyla ayarlandı")
  if(args[0] === "sıfırla"){
      db.delete(`otorol_${message.guild.id}`)
      db.delete(`logkanal_${message.guild.id}`)
      message.channel.send("Başarıyla sıfırlandı")
    
  }
    }

   
}

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'otorol',
  description: 'Otorol sistemi',
  usage: 'bla bla bla bla'
};