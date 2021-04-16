const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');


exports.run = async(client, message, args) => {

        const yardim = new Discord.RichEmbed()

             .setColor('RANDOM')
             .setAuthor(`Kategoriler`, client.user.avatarURL) 
             .setThumbnail(client.user.avatarURL)
             .addField("**Yardım**", '`el!moderasyon`\nModerasyon Menüsünü Gösterir.', true)
              .addField("**Yardım**", '`el!eğlence`\nEğlence Menüsünü Gösterir.', true)
            ///Bu şekilde kaç tane yapmak istiyorsanız kendinize göre düzenleyin
        return message.channel.sendEmbed(yardim);
}

exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['help'],
	permLevel : 0
}

exports.help = {
	name : 'yardım',
	description : 'heheh',
	usage : 'yaz'
}