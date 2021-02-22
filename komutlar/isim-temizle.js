const Discord = require("discord.js");
const client = new Discord.Client();
const eayarlar = require("../ayarlar.json");
const database = require("quick.db");

exports.run = (client, message, args) => {
  const leviemb = new Discord.MessageEmbed()
    .setColor(0x2c0032)
    .setFooter(`❤️ Forsythe`, client.user.avatarURL())
    .setTimestamp();
  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (
    !message.member.hasPermission("ADMINISTRATOR") &&
    !message.member.roles.cache.get("805588624615145473")
  )
    return message.react("746308515940925441"); 
  if (!member)
    return (
      message.react("746308516284989470") &&
      message
        .reply(`Hangi Kullanıcının Geçmiş İsimlerini Temizlemek İstiyorsun?`)
        .then(message => message.delete({ timeout: 6000 }))
    ); 

  database.delete(`isimler_${member.id}`);
  message.channel
    .send(
      leviemb.setDescription(
        `${member} Adlı Kullanıcının Geçmiş İsimleri Başarıyla Temizlendi.`
      )
    )
    .then(e => e.delete({ timeout: 6000 })); 
};

exports.conf = {
  aliases: ["isimlertemizle", "itemizle"]
};

exports.help = {
  name: "isimlertemizle"
};
