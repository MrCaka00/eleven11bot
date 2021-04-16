const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

require("./util/eventLoader")(client);


client.login(process.env.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on("guildMemberAdd", async member => {
  var kkanal = ""; ///KAYIT KANALI
  let yetkili = ""; //kayıt yetkili id
  client.channels.get(kkanal).send(
    new Discord.RichEmbed()
      .setTitle(`Aramıza Hoşgeldin`)
      .setDescription(
        `
${member.user.usernam} Aramıza Hoşgeldin Seni Aramızda Görmek Güzel!
Kayıt Olmak İçin İsmini ve Yaşını Yazmalısın.
<&@${yetkili}> Rolündekiler Seninle İlgilenecektir.`
      )
      .setImage(
        "https://media.discordapp.net/attachments/773588676239425556/773594786132787235/giphy.gif"
      )
  );
});

client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "sa" //-- KİŞİNİN YAZDIĞI
  ) {
    return msg.channel.send("**Aleyküm Selam Reis , Hoşgeldin. <3  ** "); ///- BOTUN VERDİĞİ CEVAP
  }
});

client.on("message", async msg => {
  var anahtar = await db.fetch(`kufur_${msg.guild.id}`);
  if (anahtar === "acik") {
    const küfürler = [
      "oç",
      "piç",
      "aq",
      "amq",
      "amk",
      "salak",
      "taşşak",
      "gerizekalı",
      "sik",
      "siktir",
      "@efrahim",
      "amcık",
      "orospu",
      "yarrak", //////FİBER BOTLİST & CODE
      "aptal"
    ]; //aklıma bu kdr geldi

    if (küfürler.some(küfür => msg.content.toLowerCase().includes(küfür))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete().then(msg.reply("Yasak kelime kullanma kardeş."));
      }
    }
  }
  if (!anahtar) return;
});
client.on("message", async msg => {
  var anahtar = await db.fetch(`reklamengel_${msg.guild.id}`);
  if (anahtar === "acik") {
    const linkler = [
      "http",
      "https",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".io",
      ".org",
      ".cf",
      ".ml",
      ".qa",
      ".club",
      ".gg",
      "discord.gg/"
    ];
    if (linkler.some(link => msg.content.includes(link))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete().then(msg.reply("Reklam yapmak yasak sen hayırdır kardeş"));
      } ///////////fiber botlist & CODe
    }
  }
  if (!anahtar) return;
});

client.on("guildMemberAdd", async member => {
  if (db.has(`otorol_${member.guild.id}`)) {
    var rol = db.fetch(`otorol_${member.guild.id}`);

    member.addRole(rol);
  } else {
    return;
  }

  if (db.has(`logkanal_${member.guild.id}`)) {
    var kanal = client.channels.get(db.fetch(`logkanal_${member.guild.id}`));
    let kisi = `${member.user.username}`;
    let roll = `<@&${rol}>`;
    const embed = new Discord.RichEmbed()
      .setTitle("?? Başarıyla Rol Verildi")
      .addField("??? Rol Verilen Kişi: ", member.user.tag)
      .addField("??? Verilen Rol: ", roll)
      .setColor("RANDOM")
      .setTimestamp();
    //.setFooter(`NMN Bot | 2020`);

    kanal.send(embed);
  } else {
    return;
  }
});

client.on(`guildMemberAdd`, async member => {
  const Fiber = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Hoşgeldin sefalar getirdin`)
    .setFooter(`Aramıza hoşgeldin :)`);
  member.send(Fiber);
});
client.on(`guildMemberRemove`, async member => {
  const Fiber = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(
      `Niye gittin üzdün bizi. 
:((((`
    )
    .setFooter(`CubeMCPE NetWork`);
  member.send(Fiber);
});

client.on("guildMemberRemove", async member => {
  if (db.has(`hgbb_${member.guild.id}`) === false) return;
  var kanal = member.guild.channels.get(db.fetch(`hgbb_${member.guild.id}`));

  if (!kanal) return;
  const cikis = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} Aramızdan Ayrıldı Güle Güle.`)
    .addField("?? Kullanıcı Adı: ", member.user.tag)
    .addField("?? Kullanıcı ID'si: ", member.id);
  kanal.send(cikis);
});

//////// - BOOST ÇEKİNCE MESAJ
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (oldMember.roles.has("751149645752828098")) {
    if (!newMember.roles.has("751149645752828098"))
      return client.channels
        .get("758924787018891284")
        .send(newMember.user.tag + " | Boostunu çekti ! ");
  }
});

//////// - boost basınca mesaj
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (!oldMember.roles.has("751149645752828098")) {
    if (newMember.roles.has("751149645752828098"))
      return client.channels
        .get("758924787018891284")
        .send(newMember.user.tag + " | Boost Bastı ! ");
  }
});

////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "buse" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send("Yanağına bir buse https://tenor.com/bdqsw.gif"); ///- BOTUN VERD??? CEVAP
  }
});
////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "kertomi" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send("naber iyi mi"); ///- BOTUN VERD??? CEVAP
  }
});
////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "şeri" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send(
      "mutluluk denince akla hemen onun adı gelir şeri şeri şeri"
    ); ///- BOTUN VERD??? CEVAP
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() == "kahve") {
    return msg.channel.send(
      "https://media1.tenor.com/images/b7c6db656e01f97dbe2fdb91fdb78057/tenor.gif?itemid=16748161"
    );
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() == "leylül") {
    return msg.channel.send("l mi eylül");
  }
});

////// BİR KAÇ SORU YAPMAK İSTİYORSANIZ AYNI KODU MAİNE BİRKAÇ KERE EKLEYEBİLİRSİNİZ
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "efrahim" //-- KİŞİNİN YAZDIĞI
  ) {
    return msg.channel.send("ne var lan yarram"); ///- BOTUN VERDİĞİ CEVAP
  }
});
///// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "kerem" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send("götüne pandik"); ///- BOTUN VERD??? CEVAP
  }
});
// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "ömer" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send("herkes ona gömer"); ///- BOTUN VERD??? CEVAP
  }
});

// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "doğukan" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send("koyimde yaylan"); ///- BOTUN VERD??? CEVAP
  }
});
/// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "levrek" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send("yerim seni gevrek gevrek"); ///- BOTUN VERD??? CEVAP
  }
});
//// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
///// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "çay" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send(
      "çay seçenin götüne pandik"
    ); ///- BOTUN VERD??? CEVAP
  }
});
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "günaydın"
  ) {
    return msg.channel.send("Anana günaaaaydın"); 
  }
});


////// BİR KAÇ SORU YAPMAK İSTİYORSANIZ AYNI KODU MAİNE BİRKAÇ KERE EKLEYEBİLİRSİNİZ
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "yak"
  ) {
    return msg.channel.send("https://i1.wp.com/metro.co.uk/wp-content/uploads/2015/02/giphy11.gif?quality=90&strip=all&zoom=1&resize=480%2C288&ssl=1"); 
  }
});
client.on("message", async msg => {
  if (msg.content.toLowerCase() == "2.dal") {
    return msg.channel.send(
      "https://tenor.com/view/cigarette-smoke-anime-lighter-fire-gif-16262155"
    );
  }
});
////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "Büşra" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send(
      "Adını duyan gülümser ona"
    ); ///- BOTUN VERD??? CEVAP
  }
});
////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "mami" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send(
      "Aklı fikri kari"
    ); ///- BOTUN VERD??? CEVAP
  }
});
////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "hoşbuldum canım botum" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send(
      "Canın mıyım gerçekten :relaxed: "
    ); ///- BOTUN VERD??? CEVAP
  }
});

////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "efrahimhub" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send(
      "http://www.efrahimhub.cf"
    ); ///- BOTUN VERD??? CEVAP
  }
});
////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "ceroş" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send(
      "Ortalığı dağıtmadan coş"
    ); ///- BOTUN VERD??? CEVAP
  }
});
////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "hoşbuldum tatlım" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send(
      "tatlın mıyım cidden :point_right: :point_left:"
    ); ///- BOTUN VERD??? CEVAP
  }
});

////// B?R KA? SORU YAPMAK ?ST?YORSANIZ AYNI KODU MA?NE B?RKA? KERE EKLEYEB?L?RS?N?Z
client.on("message", async msg => {
  if (
    msg.content.toLowerCase() == "aslanım çalışıyon yine he" //-- K???N?N YAZDI?I
  ) {
    return msg.channel.send("tabiki patron daima emrinizdeyim"); ///- BOTUN VERD??? CEVAP
  }
});


////// BİR KAÇ SORU YAPMAK İSTİYORSANIZ AYNI KODU MAİNE BİRKAÇ KERE EKLEYEBİLİRSİNİZ

client.on("message", msg => {
  if (client.ws.ping > 550) {
    let bolge = [
      "singapore",
      "eu-central",
      "india",
      "us-central",
      "london",
      "eu-west",
      "amsterdam",
      "brazil",
      "us-west",
      "hongkong",
      "us-south",
      "southafrica",
      "us-east",
      "sydney",
      "frankfurt",
      "russia"
    ];

    let randombolge = bolge[Math.floor(Math.random() * bolge.length)];
    let kanal = msg.guild.channels.cache.cache.find(
      c => c.name === "770295620216684554"
    );

    kanal.send(
      `Sunucunun Pingi Yükseldiğinden Dolayı Bölge Değiştirildi!\n?? Yeni Bölge: ${randombolge} ` +
        client.ws.ping
    );
    msg.guild
      .setRegion(randombolge)
      .then(g => console.log("?? Bölge:" + g.region))
      .then(g =>
        msg.channel.send("? Bölge **" + g.region + " Olarak Değiştirildi! ??")
      )
      .then(msg.reply("? Bölge Değiştirildi! "))
      .catch(console.error);
  }
});

var gif = [
  "https://i.ibb.co/sRFhGMN/images-5.jpg",
  "https://i.ibb.co/9r28DKy/images-9.jpg",
  "https://i.ibb.co/xsHQwxJ/images-3.jpg",
  "https://i.ibb.co/xsHQwxJ/images-3.jpg",
  "https://i.ibb.co/72vY0hv/images-2.jpg",
  "https://i.ibb.co/m8TXxn5/images-1.jpg"
];

client.on("message", async msg => {
  var anahtar = await db.fetch(`reklamengel_${msg.guild.id}`);
  if (anahtar === "acik") {
    const linkler = [
      "http",
      "https",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".io",
      ".org",
      ".cf",
      ".ml",
      ".qa",
      ".club",
      ".gg",
      "discord.gg/"
    ];
    if (linkler.some(link => msg.content.includes(link))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete().then(msg.reply("Reklam yapmak yasak sen hayırdır kardeş"));
      } ///////////fiber botlist & CODe
    }
  }
  if (!anahtar) return;
});

client.on("guildMemberAdd", async member => {
  if (db.has(`otorol_${member.guild.id}`)) {
    var rol = db.fetch(`otorol_${member.guild.id}`);

    member.addRole(rol);
  } else {
    return;
  }

  if (db.has(`logkanal_${member.guild.id}`)) {
    var kanal = client.channels.get(db.fetch(`logkanal_${member.guild.id}`));
    let kisi = `${member.user.username}`;
    let roll = `<@&${rol}>`;
    const embed = new Discord.RichEmbed()
      .setTitle("?? Başarıyla Rol Verildi")
      .addField("??? Rol Verilen Kişi: ", member.user.tag)
      .addField("??? Verilen Rol: ", roll)
      .setColor("RANDOM")
      .setTimestamp();
    //.setFooter(`Octopus Bot | 2020`);

    kanal.send(embed);
  } else {
    return;
  }
});

client.on("guildMemberRemove", async member => {
  if (db.has(`hgbb_${member.guild.id}`) === false) return;
  var kanal = member.guild.channels.get(db.fetch(`hgbb_${member.guild.id}`));

  if (!kanal) return;
  const cikis = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} Aramızdan Ayrıldı Güle Güle.`)
    .addField("?? Kullanıcı Adı: ", member.user.tag)
    .addField("?? Kullanıcı ID'si: ", member.id);
  kanal.send(cikis);
});

//////////////FİBER BOTLİST & CODE
client.on("guildMemberAdd", async member => {
  if (db.has(`hgbb_${member.guild.id}`) === false) return;
  var kanal = member.guild.channels.get(db.fetch(`hgbb_${member.guild.id}`));

  if (!kanal) return;
  const giris = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} Aramıza Katıldı Hoşgeldin.`)
    .addField("?? Kullanıcı Adı: ", member.user.tag)
    .addField("?? Kullanıcı ID'si: ", member.id);
  kanal.send(giris);
});
