const Discord = require('discord.js');
exports.run = (client, message, args) => {
    if (!message.member.hasPermissions("MUTE_MEMBERS")) return message.channel.send("Bu komutu kullanmak için yetkin yok!!!")
    let kullanici = message.mentions.members.first()
    
    if (!kullanici) return message.channel.send("Kimi susturcam ??")
    kullanici.setMute(true, `Susturan kişi ${message.author.tag}`)
        .then(() =>
            message.channel.send(`${kullanici} adlı kullanıcının mikrofonu kapatıldı`))
        .catch(console.error);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ses-mute'],
    permLevel: 0
};
exports.help = {
    name: 'ses-sustur',
    
};
