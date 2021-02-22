const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const ayarlar = require("./ayarlar.json"); 
const chalk = require("chalk"); 
const moment = require("moment"); 
var Jimp = require("jimp"); 
const { Client, Util } = require("discord.js"); 
const fs = require("fs"); 
const db = require("quick.db"); 
const express = require("express"); 
require("./util/eventLoader.js")(client); 
const path = require("path"); 
const snekfetch = require("snekfetch"); 
//const ms = require("ms"); 

var prefix = ayarlar.prefix; 

const log = message => {
  
  console.log(`${message}`); 
};
client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection(); 
fs.readdir("./komutlar/", (err, files) => {
  
  if (err) console.error(err); 
  log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {
    
    let props = require(`./komutlar/${f}`); 
    log(`Yüklenen komut: ${props.help.name}.`); 
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
  if (message.author.id === ayarlar.sahip) permlvl = 4;
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

client.login(process.env.Token).then(a => {
  console.log(`✅ Tokene Bağlanıldı | Bot "${client.user.tag}" İsmi İle Giriş Yaptı. `)}).catch(a => {
  return log('⛔ Bot Başlatılamadı Hatalı Token ! ')
})

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\

client.on("guildMemberAdd", member => {
  const kanal = member.guild.channels.cache.find(
    r => r.id === "805596683072831489"
  );
  const register = ["<@&805588624615145473>"];
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();

  var kontrol;
  if (kurulus < 1296000000)
    kontrol =
      "Hesap Durumu: Güvenilir Değil ⛔ ";
  if (kurulus > 1296000000)
    kontrol =
      "Hesap Durumu: Güvenilir Gözüküyor ✅ ";
  moment.locale("tr");
  const levilog = new Discord.MessageEmbed()
    .setAuthor(member.guild.name)
     //.setThumbnail(member.avatarURL)
  .setImage("https://cdn.discordapp.com/attachments/805598053113004052/811350856519647242/standard_4.gif")
  .setDescription(
      "<a:uzi:811651378363105290> ・ ** <@" +
        member +
        "> Wellcome to Deep Squad \n\n <a:uzi:811651378363105290> ・ Seninle Birlikte `" +
        member.guild.memberCount +
        "` Kişiyiz.\n\n <a:uzi:811651378363105290> ・ Hesabın Oluşturulma Tarihi: " +
        moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +
        "\n\n <a:uzi:811651378363105290> ・  " +
        kontrol +
        "\n\n <a:uzi:811651378363105290> ・ Ekip Katılarak Kayıt Olabilirsin.**\n"
    );
  kanal.send(levilog);
  kanal.send(register);
});

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\

//------------------------------------------------------------------------------------------------------------------------------------\\

client.on("guildMemberAdd", member => {
  var moment = require("moment");
  require("moment-duration-format");
  moment.locale("tr");
  var { Permissions } = require("discord.js");
  var x = moment(member.user.createdAt)
    .add(7, "days")
    .fromNow();
  var user = member.user;
  x = x.replace("birkaç saniye önce", " ");
  if (!x.includes("önce") || x.includes("sonra") || x == " ") {
    const kytsz = member.guild.roles.cache.find(
      r => r.id === "805588342070181898"
    );
    var rol = member.guild.roles.cache.get("805590792919842817"); // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
    var kayıtsız = member.guild.roles.cache.get("805588342070181898"); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
    member.roles.add(rol);
    member.roles.remove(kytsz);

    member.user.send(
      "Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır."
    );
    setTimeout(() => {}, 1000);
  } else {
  }
});

//------------------------------------------------------------------------------------------------------------------------------------\\

//-----------------------TAG-ROL----------------------\\

//TAG ALANA ROL
//TAG ALANA ROL
client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    const tag = "ᴰᴱᴱᴾ"; //Tagınızı Koyun
    const sunucu = "805586097655906334"; //Sunucu İD
    const kanal = "806477549504692235"; //Log Kanal İD
    const rol = "805952832569344092"; //Rol İd

    try {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam ${
              newUser.username
            }, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Sana Verdim!`
          );
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(
                `${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım!`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam **${
              newUser.username
            }**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Senden Aldım!`
          );
      }
    } catch (e) {
      console.log(`Bir hata oluştu! ${e}`);
    }
  }
});
//-----------------------TAG-KONTROL----------------------\\
//-----------------------TAG-KONTROL----------------------\\

/////OTOİSİM
client.on("guildMemberAdd", member => {
  member.setNickname("ᴰᴱᴱᴾİsim ' Yaş"); ////YENI GELENLERE VERILCEK ISIM
});

client.on("ready", () => {
  client.channels.cache.get("805599183498117140").join();
});

//TAG OTOCEVAP
client.on("message", message => {
if(message.content === "tag")
return message.channel.send("ᴰᴱᴱᴾ")
})