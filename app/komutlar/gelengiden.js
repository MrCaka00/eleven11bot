const Discord = require("discord.js");


const db = require("quick.db");

 

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR"))

    return message.reply(

      `Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok :x:`

    );

  if(!args[0]) return message.channel.send("Doğru kullanım `!gelen-giden ayarla/sıfırla`")
  if(args[0] === "ayarla"){

    let kanal = message.mentions.channels.first();

    if (!kanal) {

      return message.reply("Bir kanal etiketleyin");

    }
    db.set(`hgbb_${message.guild.id}`, kanal.id);

    message.channel.send(

      `Gelen giden kanalı başarıyla ayarlandı`

    );
  }
  if(args[0] === "sıfırla"){
    
    db.delete(`hgbb_${message.guild.id}`)
    message.channel.send("Başarıyla sıfırlandı.")
  }
};

 //////////////////FİBER BOTLİST & CODE

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

 

exports.help = {

  name: "gelen-giden",

  description: "Gelen giden sistemi",

  usage: "gelen-giden"

};