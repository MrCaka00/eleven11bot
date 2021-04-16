const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
exports.run = (client, message, args) => {
var prefix = ayarlar.prefix
 message.channel.send(new Discord.RichEmbed()
.setTitle(`Yardım Menüsü`)
.setDescription(`
• ${prefix}Aşk Ölçer : Etiketlediğiniz kişiyle aranızdaki aşkı ölçer. ||el!aşkölçer <@kişi>||
• ${prefix}Avatar : Etiketlenen kişinin avatarını gösterir . ||el!avatar <@kişi>||
• ${prefix}Meme : Rastgele meme (mim) atar. (şuanda pekfazla eklemedim) ||el!meme||
• ${prefix}Söyle : Botu sesliye sokar ve yazdığınız cümleyi söyler. ||el!söyle <cümle>||
`)//// Kendinize göre komutları arttırabilirsiniz
.setColor("RANDOM")
.setFooter(`Tüm Hakları Saklıdır.`))

//// Basit Yardım Menusu İstek Üzerine Yapılmıştır
 
  

}



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['help'],
  permLevel: 0
}

exports.help = {
  name: 'eğlence',
  description: 'Botu yeniden başlatır.',
  usage: 'eğlence'
};